import axios from 'axios'; 
import QS from 'qs'; 
import AsyncStorage from '@react-native-community/async-storage';     
import {Decrypt,Encrypt} from "./util/secret.js"

axios.defaults.baseURL = 'https://juheapp.mx5918.com/api/';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.response.use(    
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }     
    },    
    error => {
        return Promise.reject(error)
    }    
);
export function Post(url, params) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("token").then((datas)=>{
            axios.defaults.headers.common['token']=datas
            axios.post(url, QS.stringify(params))
            .then(res => {
                if(res.data.code==100){
                    AsyncStorage.removeItem("token")
                    this.props.navigation.navigate('login')
                }
                resolve(JSON.parse(Decrypt(res.data)));
            })
            .catch(err =>{
                reject(err)
            })
        })
         
    });
}
export function Get(url,data) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("token").then((datas)=>{
            axios.defaults.headers.common['token']=datas
            axios.get(url,{params:data}).then((res)=>{
                    resolve(Decrypt(res.data));
            }).catch(err =>{
                    reject(err)
            })
        })
        
    });
}