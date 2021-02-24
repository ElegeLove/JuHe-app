import {Get,Post} from "./index"

//广告页
export const AdverPage = () => {
    return Get('auth/adv')
};
//接口统一管理页面
//发送验证码
export const sendCode = params => {
    return Get('auth/sendsms',params)
};
//登录
export const LoginIn = params => {
    return Get('auth/login',params)
};
//注册
export const RegisterInfo = params => {
    return Get('auth/register',params)
};
//找回密码
export const Forget = params => {
    return Post('auth/password',params)
};
//收益
export const PaydeIndex = params => {
    return Get('payde/index',params)
};
//收款明细
export const PaydeReclist = params => {
    return Get('payde/reclist',params)
};
//付款明细
export const PaydePaylist = params => {
    return Get('payde/paylist',params)
};
//获取用户信息
export const MemberInfo = params => {
    return Get('member/info',params)
};
//微信绑定
export const MemberWechat = params => {
    return Get('member/wechat',params)
};
//支付宝绑定
export const MemberAlip = params => {
    return Get('member/alip',params)
};
//提现明细
export const WithdrawIndex = params => {
    return Get('withdraw/index',params)
};
//获取用户个人信息
export const getUserInfo = params => {
    return Post('member/info',params)
};
//邀请用户列表
export const inviteUserList = params => {
    return Get('member/team',params)
};
//通知列表
export const noticeList = params => {
    return Get('member/msg',params)
};
//提现
export const withdrawAdd = params => {
    return Post('withdraw/add',params)
};
//支付宝登录参数
export const memberAliloginparam = params => {
    return Get('member/aliloginparam',params)
};
//配置
export const authConfig = params => {
    return Get('auth/config',params)
};
//获取省市区数据
export const authArea = params => {
    return Get('auth/area',params)
};
//下单
export const placeOrder = params => {
    return Get('order/order.html',params)
};
//图片上传
export const imgUpload = params => {
    return Post('auth/upload',params)
};
//支行搜索
export const Branchbank = params => {
    return Get('auth/branchbank',params)
};
//付款返利计算
export const Paybark= params => {
    return Get('order/payreturnamount',params)
};
//用户申请二维码填写信息
export const ApplymemberInfo= params => {
    return Get('member/memberinfo',params)
};
//用户申请二维码
export const Applymember = params => {
    return Post('member/applymemberinfo',params)
};
//扫码接口返回收款商家信息
export const RecmemberInfo= params => {
    return Get('member/recmember',params)
};
//到账消息查询
export const GetVoice= params => {
    return Get('member/voice',params)
};