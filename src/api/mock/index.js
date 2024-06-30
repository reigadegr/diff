import request from '@/utils/request'


export function getListApi(params) {
  return request({
    url: "/list/get",
    method: "get",
    params
  });
}

export function getListApiError(data) {
  return request({
    url: "/list/error",
    method: "post",
    data
  });
}
