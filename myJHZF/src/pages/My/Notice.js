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
   import { noticeList,getUserInfo } from "../http/urlApi";
   import { SafeAreaView } from "react-navigation";
//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";

   export default class Notice extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
        noticeLists:[],
        isRefreshing:false,
        isLoadMore:true,
        alldata:{
          page:0,
        },
       };
     }
      UNSAFE_componentWillMount(){
        this.getNoticeList()
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
     getNoticeList(){
      let data = JSON.parse(JSON.stringify(this.state.alldata))
      noticeList(data).then(res => {
        res = JSON.parse(res)
        this.setState({isRefreshing:false})
        if(res.code == 0){
          if(res.data.data.length==0){
            this.setState({isLoadMore:false})
          }
          this.setState({
            noticeLists:res.data.data,//this.state.arr.concat(res.data.data)
          })
        }
      }).catch(err =>{
          console.log(err)
      })
     }
     renderItem(item,index){
      return(
        <View key={index} style={{paddingTop:10,paddingBottom:10,marginLeft:10,marginRight:10,borderBottomWidth:1,borderColor:'#F5F5F5'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
        <Text style={styles.item}>{item.type_text}</Text>
            <Text style={{padding: 6,fontSize: 12,color:'#999999'}}>{item.create_time_show_text}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Text style={{padding: 6,fontSize: 12,color:'#666666'}}>{item.content}</Text>
          </View>
        </View>
      )
     }
     onRefresh(){             //下拉刷新
      this.setState({
          isRefreshing:true
      },()=>{
          this.setState({
            noticeLists:[],
            alldata:{
                page:1
            }
          },()=>{
              this.getNoticeList() 
          })
      })
    }
    loadMore(){           //上拉加载
        this.setState({
            isLoadMore:true
        },()=>{
            this.setState({
                alldata:{
                    page:++this.state.alldata.page
                }
            },()=>{
                this.getNoticeList() 
            })
        })
    }
     render() {
       return (
         <View style={styles.container}>
             <FlatList
                //FlatList基本属性
                data={this.state.noticeLists}
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
         color:'#222222'
     },
   });