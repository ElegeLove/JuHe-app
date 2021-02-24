import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity,BackHandler} from "react-native"
import Personal from "../My/CodeComponent/personal"          //个人
import Merchant from "../My/CodeComponent/merchant"          //商户

export default class BecomeBusy extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkType:["个人收款码","商户收款码"],
            postData:{

            },
            checkIndex:0
        }
        this.getTypeView = this.getTypeView.bind(this)
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
    check(ix){         //切换导航
        this.setState({
            checkIndex:ix
        })
    }
    getPersonal(){
        // this.props.navigation.navigate('Home')
        // history.back()
        this.props.navigation.pop(1)
        // this.props.navigation.goback(-1)
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback()
        }
    }
    getTypeView(){         //渲染顶部视图
        let arr = []
        this.state.checkType.map((item,index)=>{
            arr.push(
                <TouchableOpacity activeOpacity={0.5}  key={index} onPress={this.check.bind(this,index)}>
                    <View style={styles.typebox}>
                             <Text style={styles.titles}>{item}</Text>
                        {
                            this.state.checkIndex==index?(
                                <Text style={styles.empty}></Text>
                            ):null
                        }
                    </View>
                </TouchableOpacity>
            )
        });
        return arr;
    }
    
    render(){
        var state = this.state
        return(
            <View style={styles.box}>
                <View style={[styles.centers,styles.headers]}>
                    {this.getTypeView()}
                </View>
                {
                    state.checkIndex==0?(
                        <Personal callBack={(m)=>{this.getPersonal(m);}}/>
                    ):(
                        <Merchant callBack={(m)=>{this.getPersonal(m);}}/>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    empty:{
        width:25,
        height:3,
        backgroundColor:'#FF0000',
        borderRadius:3,
        position:"absolute",
        bottom:0
    },
    typebox:{
        position:"relative",
        display:"flex",
        alignItems:"center",
        paddingBottom:10
    },
    box:{
        flex:1,
        backgroundColor:"#fff"
    },
    centers:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    headers:{
        justifyContent:"space-around",
        paddingTop:14,
        borderTopColor:"#EEEEEE",
        borderTopWidth:1,
    },
    titles:{
        fontSize:14,
        color:"#333333"
    }
})