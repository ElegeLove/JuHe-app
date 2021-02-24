import store from "../../../store"
import Common from "../common"
import {Toast,Portal} from '@ant-design/react-native';
export function Upload(type,uri,name,lastType){
    var CommUpload = store.getState().uploadComm
    var fileName = Common.randoms()
    const uploadMediaData = new FormData();
        uploadMediaData.append('accessKeyId', CommUpload.AccessKeyId);
        uploadMediaData.append('bucket', CommUpload.bucket);
        uploadMediaData.append('accessKeySecret', CommUpload.AccessKeySecret);
        uploadMediaData.append('endpoint', CommUpload.endpoint);
        uploadMediaData.append('key', fileName+"."+lastType);
        uploadMediaData.append('stsToken', CommUpload.SecurityToken);
        uploadMediaData.append('success_action_status', 201);
        uploadMediaData.append('file', {
        uri,
        type,
        name,
    });
    const key = Toast.loading('正在上传中',500)
    return new Promise((resolve, reject) => {
        fetch(CommUpload.endpoint,{
            method:"POST",
            'Content-Type':"multipart/form-data",
            body:uploadMediaData
        }).then((res)=>{
            Portal.remove(key)
            resolve(res.url+"/"+fileName+"."+lastType)
            Toast.info("上传成功",1,'',false)
        }).catch((err)=>{
            reject(err)
            Portal.remove(key)
            Toast.info("上传失败",1,'',false)
        })
    })

}