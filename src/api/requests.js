import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
// 二次封装
const requests = axios.create({
    baseURL: "http://152.136.254.142:3000/api",
    timeout: 5000,
})
// 拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    const token = sessionStorage.getItem("token")
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token;
    }

    return config
});
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;

}, (error) => {
    return Promise.reject(new Error('faile'))
})
export default requests