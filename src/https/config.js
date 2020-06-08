// 首先第一第二句引入flyio
// 接着添加拦截器，拦截器部分按照个人需求可以参考flyio官方文档
// (https://wendux.github.io/dist/#/doc/flyio/readme)拦截器部分
// 然后请求配置，可以参考官方文档请求配置部分

// **这里要注意的是**最后export部分，只有对当前实例export，
// 别的地方才能通过import ... fron 'config'来引用fly
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
fly.interceptors.request.use((config, promise) => {
  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
})
// fly.config.baseURL = 'https://mp.zymcloud.com/hp-hd/applet/activity'
fly.config.timeout = 5000
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fly.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    fly.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  })
}


export default {
  get,
  post
}
