import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Common from "../../static/js/common"
import {PaydePaylist} from "../http/urlApi"

   export default class PaymentDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        arr:[],
        isRefreshing:false,
        isLoadMore:true,
        alldata:{
          page:1,
        }
      };
    }
    UNSAFE_componentWillMount(){
      this.getData()
    }
    componentWillMount() {
      // //监听返回键
      BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }
        
    componentWillUnmount() {
        //取消对返回键的监听
        BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    } 
    //BACK物理按键监听
    onBackClicked = () => {
        const route = this.props.navigation.state.routeName;
        if (route != 'My' || route != 'Profit' || route != 'Home') {
            this.props.navigation.pop();
            return true;//true 表示返回上一页
        }else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近0.5秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
            }
            this.lastBackPressed = Date.now();
            this.refs.toast.show('再按一次退出应用',1000)
            return true;
        }
    }
    getData(){           //请求
     let data = JSON.parse(JSON.stringify(this.state.alldata))
     PaydePaylist(data).then((item)=>{
         var res = JSON.parse(item)
         this.setState({isRefreshing:false})
         if(res.code==0){
             if(res.data.data.length==0){
                  this.setState({isLoadMore:false})
             }
             this.setState({
                 arr:this.state.arr.concat(res.data.data)
             })
         }
     })
    }
    renderItem(item,index){
     return(
       <View key={index} style={{paddingTop:10,paddingBottom:10,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderColor:'#F5F5F5'}}>
           <View>
             <Text style={styles.item}>{item.content}</Text>
             <Text style={{padding: 6,fontSize: 14,color:'#888888'}}>{item.create_time_show_text}</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',}}>
             <Text style={{padding: 6,fontSize: 14,color:'red'}}>付&yen;{item.order_amount}</Text>
             <Text style={{padding: 6,fontSize: 14,color:'red'}}>返&yen;{item.amount}</Text>
           </View>
         </View>
     )
    }
    onRefresh(){             //下拉刷新
     this.setState({
         isRefreshing:true
     },()=>{
         this.setState({
             arr:[],
             alldata:{
                 ...this.state.alldata,
                 page:1
             }
         },()=>{
             this.getData() 
         })
     })
    }
    loadMore(){           //上拉加载
        this.setState({
            isLoadMore:true
        },()=>{
            this.setState({
                alldata:{
                    ...this.state.alldata,
                    page:++this.state.alldata.page
                }
            },()=>{
                this.getData() 
            })
        })
    }
    render() {
      return (
        <View style={styles.container}>
            <FlatList
                   //FlatList基本属性
                   data={this.state.arr}
                   renderItem={({item,index})=>this.renderItem(item,index)}
                   keyExtractor={(item, index) => index.toString()}

                   //FlatList上拉加载更多
                   ListFooterComponent={()=>Common.ListFooterComponent(this.state.isLoadMore)}
                   onEndReached={this.loadMore.bind(this)}
                   onEndReachedThreshold={0.3}

                   //PullList下拉刷新
                   onRefresh={this.onRefresh.bind(this)}
                   //控制下拉刷新状态的属性，为true时显示头部刷新组件，为false则隐藏
                   refreshing ={this.state.isRefreshing}
               />
        </View>
      );
    }
   }
   const styles = StyleSheet.create({
     container: {
        flex: 1,
     },
     item: {
         padding: 6,
         fontSize: 14,
     },
   });