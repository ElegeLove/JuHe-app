   import React from "react";
   import {
     View,
     Text,
     Image,
     TextInput,
     FlatList,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     BackHandler
   } from "react-native";
   import Common from "../../static/js/common"
   import { inviteUserList,getUserInfo } from "../http/urlApi";
   import { SafeAreaView } from "react-navigation";
   import {ScrollableTabView, DefaultTabBar, ScrollableTabBar, TabBarType} from 'react-native-vtron-scrollable-tab';
//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";

   export default class MyTeam extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         moneyVal:'',
         moneySum:'',
         isWeChat:true,
         isRefreshing:false,
         isLoadMore:false,
         TabChoose:0,
         alldata:{
            page:0,
          },
         oneData:[],
         rewardNum:'',
         teamNum:'',
         oneInviNum:'',
         twoInviNum:'',
       };
       this.getUserList(this.state.TabChoose,this.state.alldata.page)
       getUserInfo({}).then(res => {
        if(res.code == 0){
            this.setState({
                 rewardNum:res.data.reward_num,
                 teamNum:res.data.team_num,
                 oneInviNum:res.data.one_invi_number,
                 twoInviNum:res.data.two_invi_number,
            })
        }
        }).catch(err =>{
            console.log(err)
        })
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
    //  UNSAFE_componentWillMount(){
      
    //  this.getUserList(this.state.TabChoose,this.state.alldata.page)
    // }
     getUserList(val,page){
      // let data = JSON.parse(JSON.stringify(this.state.alldata))
      inviteUserList({type:val,page:page}).then(res => {
        res = JSON.parse(res)
        this.setState({oneData:[]})
        if(res.code == 0){
          this.setState({isRefreshing:false})
          if(res.data.data.length< res.data.per_page){
            this.setState({isLoadMore:false})
          }
          this.setState({
            oneData:res.data.data,//this.state.arr.concat(res.data.data)
          })
        }
      }).catch(err =>{
          console.log(err)
      })
     }

     onRefresh(){             //下拉刷新
      this.setState({
          isRefreshing:true
      },()=>{
          this.setState({
              oneData:[],
              alldata:{
                  page:0
              }
          },()=>{
            this.getUserList(this.state.TabChoose,this.state.alldata.page)
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
              this.getUserList(this.state.TabChoose,this.state.alldata.page)
            })
        })
    }
     TabChooseToggleFun(e) {
         if(e != this.state.TabChoose) {
            this.setState({
                oneData:[],
                alldata:{
                    page:0
                }
            })
             this.getUserList(e,this.state.alldata.page)
             this.setState({
                 TabChoose: e,
             })
         }
     }
     renderItem(item,index){
      return(
        <View key={index} style={{paddingTop:10,paddingBottom:10,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderColor:'#F5F5F5'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image style={{width:40,height:40,marginRight:6,borderRadius:20}} source={{uri:item.show_img}}></Image>
            <View>
                <Text style={styles.item}>{item.type_text}</Text>
                <Text style={{fontSize: 14,color:'#888888'}}>{item.show_name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Text style={{padding: 6,fontSize: 12,color:'#888888'}}>注册时间：{item.create_time_show_text}</Text>
          </View>
        </View>
      )
     }
     // 选项卡面板
     TabChooseTogglePanelFunWrap() {
        return(
          <View>
              <FlatList
                  data={this.state.oneData}
                  renderItem={({item}) => <View style={{paddingTop:10,paddingBottom:10,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderColor:'#F5F5F5'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Image style={{width:40,height:40,marginRight:6,borderRadius:20}} source={{uri:item.show_img}}></Image>
                      <View>
                          <Text style={styles.item}>{item.type_text}</Text>
                          <Text style={{fontSize: 14,color:'#888888'}}>{item.show_name}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                      <Text style={{padding: 6,fontSize: 12,color:'#888888'}}>注册时间：{item.create_time_show_text}</Text>
                    </View>
                  </View>}
              />
          </View>
        )
     }
     render() {
       return (
         <View>
            <View style={{position: 'relative'}}>
                <Image style={{justifyContent:'center',alignItems:'center'}} source={require('../../images/team_bg.png')}></Image>
                <View style={{position: 'absolute',top:0,width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:20,}}>
                    <View style={{borderRightWidth:1,borderColor:'#F5F5F5',paddingLeft:50,paddingRight:50}}>
                        <Text style={{fontSize:24,color:'#FFFFFF'}}>&yen;{this.state.rewardNum}</Text>
                        <Text style={{fontSize:12,color:'#FFFFFF',marginTop:8}}>累计奖励</Text>
                    </View>
                    <View style={{paddingLeft:50,paddingRight:50}}>
                        <Text style={{fontSize:24,color:'#FFFFFF'}}>{this.state.teamNum}人</Text>
                        <Text style={{fontSize:12,color:'#FFFFFF',marginTop:8}}>团队成员</Text>
                    </View>
                </View>
            </View>
            {/* 选项卡 */}
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderColor:'#E5E5E5'}}>
                <TouchableOpacity activeOpacity={1} style={styles.tabTitle} onPress={()=>this.TabChooseToggleFun(0)}>
                    <Text>一级邀请（{this.state.oneInviNum}人）</Text>
                    <Text style={{height:2,width:60,borderBottomWidth:this.state.TabChoose === 0 ? 2 : 0,borderColor:'#FF0000',marginTop:14}}></Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.tabTitle} onPress={()=>this.TabChooseToggleFun(1)}>
                    <Text>二级邀请（{this.state.twoInviNum}人）</Text>
                    <Text style={{height:2,width:60,borderBottomWidth:this.state.TabChoose === 1 ? 2 : 0,borderColor:'#FF0000',marginTop:14}}></Text>
                </TouchableOpacity>
            </View>
            {/* 选项卡面板 */}
            {/* {this.TabChooseTogglePanelFunWrap()} */}
            <FlatList
                //FlatList基本属性
                data={this.state.oneData}
                renderItem={({item,index})=>this.TabChooseTogglePanelFunWrap(item,index)}
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
      tabTitle:{
        paddingTop:14,
        paddingLeft:10,
        paddingRight:10,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
      }
   });