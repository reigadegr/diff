import Mock from 'mockjs'

const mock = [
  {
    url: "/dev-api/list/get",
    delay: 1000,
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: '返回数据内容'
      }
    }
  },
  {
    url: "/dev-api/list/error",
    delay: 1000,
    method: 'post',
    response: () => {
      return {
        code: 400,
        msg: '错误测试',
        data: null
      }
    }
  },

]

export default mock
