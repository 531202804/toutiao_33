import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request

// 添加请求拦截器
// config 是每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 每一次发请求都会执行
    // 登录了所有请求都会加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `bearer ${tokenObj.token}`
    }
    console.log(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
