import axios from 'axios'
import NProgress from "./progress";
import { showFailToast } from "vant";
import { getToken } from "./auth";

// 默认 axios 实例请求配置
const defaultConfig = {
  headers: {
    "Content-Type": 'application/json;charset=utf-8'
  },
  // 超时
  timeout: 50000,
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_BASE_API,
  data: {}
};

// 创建axios实例
const service = axios.create(defaultConfig);

// 请求拦截
service.interceptors.request.use(
  config => {
    NProgress.start();
    // 发送请求前，可在此携带 token
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }

    // FormData数据去请求头Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    showFailToast(error.message);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  res => {
    NProgress.done();
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    // 与后端协定的返回字段
    let { code, msg, data } = res.data;
    // 未设置状态码则默认成功状态
    code = code || 200;
    if (code === 401) {
      // 未登录处理
      // router.push('/login')
    } else if (code !== 200) {
      // 处理请求错误
      showFailToast(msg);
    } else {
      return Promise.resolve(data)
    }

  },
  (error) => {
    NProgress.done();
    console.error('err' + error)
    // 处理 HTTP 网络错误
    let prefix = `请求出错,地址: ${error.response?.config?.url}`;
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    showFailToast(prefix + message);
    return Promise.reject(error)
  }
);

export default service
