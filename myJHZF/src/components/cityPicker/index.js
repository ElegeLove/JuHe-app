import React,{Component} from "react"
import {StyleSheet,View,Dimensions,Text} from 'react-native';
import Picker from 'react-native-picker';
let _Picker = null;
import area from "./area.json"
var {height,width} =  Dimensions.get('window');

export default class Indexs extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false,
            defaultCity:["北京","北京市","东城区"]
        }
    }
    openPicker(defaultCitys){
        this.setState({
            show:true,
            defaultCity:defaultCitys
        },()=>{
            this.provincialUrbanArea();
        })
    }
    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                var cityArr = []
                for(var y=0,s=area[i]['city'][j]['area'].length;y<s;y++){
                   cityArr.push(area[i]['city'][j]['area'][y].name)
                }
                _city[area[i]['city'][j]['name']] = cityArr
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    provincialUrbanArea(){
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: this.state.defaultCity,
            pickerConfirmBtnText:"完成",
            pickerTitleText:"",
            pickerCancelBtnColor:[133,133,133,1],
            pickerConfirmBtnColor:[238,17,34,1],
            pickerToolBarBg:[136,136,136,0.1],
            pickerBg:[255,255,255,1],
            pickerCancelBtnText:"取消",
            onPickerConfirm: (pickedValue,id) => {
                this.setState({
                    show:false
                })
                this.props.confirm(pickedValue,[area[id[0]].region_id,area[id[0]].city[id[1]].region_id,area[id[0]].city[id[1]].area[id[2]].region_id])
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    show:false
                })
            },
            onPickerSelect: (pickedValue,a) => {
                // Picker.select(['山东', '青岛', '黄岛区'])
                // console.log(area[a[0]].region_id,area[a[0]].city[a[1]].region_id,area[a[0]].city[a[1]].area[a[2]].region_id);
            }
        });
        Picker.show();
    }
    //组件初始化
    pickerInit = (data,selectedValue,title) => {
        Picker.init({
            pickerData:data,
            selectedValue: selectedValue,
            pickerTitleText:"",
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerCancelBtnColor:[133,133,133,1],
            pickerBg:[255,255,255,1],
            pickerToolBarBg:[255,255,255,1],
            //确定
            onPickerConfirm: data => {
                data = data.join(' ');
                this.props.cback(data);
            },
            //取消
            onPickerCancel: data => {
                // console.log(data,"44");
            },
            //选择
            onPickerSelect: data => {
                // console.log(data);
            }
        });
        _Picker = Picker;
        _Picker.show();
    }
    render(){
        return(
            <View style={{flex:1}}>
                    
            </View>

        )
    }
}