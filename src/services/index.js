import request from '../utils/request'
import { BASE_URL, EMMA_API_BASE_URL } from '../consts/env'

 
 export const getUserInfo = () => request.get(`${BASE_URL}/v1/me`)

 

 // 获取七牛上传token
export const getQiniuToken = async () => {
  return request.post(`${EMMA_API_BASE_URL}/v1/qiniuToken`, {})
}