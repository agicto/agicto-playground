import { XIJING_API_URL } from '@/consts/env'
import { debounce } from 'lodash'
import { violationContent } from './chat'
import { toast } from 'react-toastify'
import request from '../utils/request'

const TIMEOUT = 300
let timerOut = null
let timerOutCount = 0
let errorTryCount = 0

// 热门应用列表
export const getHotApp = () => request.post(`${XIJING_API_URL}/v1/service/hotAppList`)

// 热门应用列表
export const getHotImg = () => request.post(`${XIJING_API_URL}/v1/service/hotImgList`)

// 市场应用列表
export const getApplist = params => request.post(`${XIJING_API_URL}/v1/service/appList`, params)
export const getAppRankList = params => request.post(`${XIJING_API_URL}/v1/service/appRankList`, params)

//  我的ket列表
export const getUserkeyList = params => request.post(`${XIJING_API_URL}/v1/service/keyList`, params)

// 工作区应用列表
export const getUserWorkAppList = () => request.post(`${XIJING_API_URL}/v1/service/userWorkAppList`)

// 创建应用
export const createApp = params => request.post(`${XIJING_API_URL}/v1/service/createApp`, params)

// 更新APP
export const updateApp = params => request.post(`${XIJING_API_URL}/v1/service/updateApp`, params)

// APP详情
export const getAppDetail = params => request.post(`${XIJING_API_URL}/v1/service/getAppInfo`, params)

// APP配置
export const getAppConfig = params => request.post(`${XIJING_API_URL}/v1/service/getAppConfig`, params)
// 获取公开app配置
export const getChatAppConfig = appId => request.post(`${XIJING_API_URL}/v1/service/getChatAppConfig`, { appId })

// APP配置更新
export const updateAppConfig = params => request.post(`${XIJING_API_URL}/v1/service/updateAppConfig`, params)

// APP删除
export const delApp = params => request.post(`${XIJING_API_URL}/v1/service/delApp`, params)

// 我的应用会话列表
export const getMyAppDialog = params => request.post(`${XIJING_API_URL}/v1/service/userAppDialogList`, params)
// .创建应用会话
export const createAppChat = params => request.post(`${XIJING_API_URL}/v1/service/createAppDialog`, params)

// .编辑&删除应用会话
export const updateAppDialog = params => request.post(`${XIJING_API_URL}/v1/service/updateAppDialog`, params)

/**
 * dialogId
 * .删除应用会话
 * */
export const deleteAppDialog = params => request.post(`${XIJING_API_URL}/v1/service/delAppDialog`, params)

// .用户手机号注册
export const registerMobile = params => request.post(`${XIJING_API_URL}/v1/registerMobile`, params)

// .用户手机号密码登录
export const loginMobilePwd = params => request.post(`${XIJING_API_URL}/v1/loginMobilePwd`, params)

// .用户验证码登录
export const loginByMobile = params => request.post(`${XIJING_API_URL}/v1/loginByMobile`, params)

export const getPhoneCode = payload => request.post(`${XIJING_API_URL}/v1/sendCode`, payload)
// .应用demo模板列表
export const appDemoList = params => request.post(`${XIJING_API_URL}/v1/service/appDemoList`, params)

// .添加/移除应用到工作区 type 类型 1添加 2移除
export const addWorkSpace = params => request.post(`${XIJING_API_URL}/v1/service/addWorkSpace`, params)

//  会话聊天记录
export const getRecord = params => request.post(`${XIJING_API_URL}/v1/service/chat/record`, params)
// 邮箱订阅
export const subscribe = params => request.post(`${XIJING_API_URL}/v1/service/subscribe`, params)
// 钉钉 通知
export const report = ({ content }) =>
  request.post(`${XIJING_API_URL}/v1/service/error/report`, {
    content: {
      ...content,
      date: new Date(),
    },
  })

// const checkContent = debounce(async params => {
//   if (!params?.text) return true
//   let res = await violationContent(params)
//   return res?.data?.allow
// }, 200)
const checkContent = async params => {
  if (!params?.text) return true
  let res = await violationContent(params)
  return res?.data?.allow
}

export const openAi = (data, options, oldCOntent = '', aiType='message') => {
  let isCheckContent = false
  let currentRecordId = null
  let needTimeOut = true
  let chatEnd = false
  const checkErrorMsg =
    '抱歉，您提出的问题涉及敏感信息，我不能参与对该话题的讨论。根据有关规定，请您注意不要提出涉恐，涉黄，涉政等相关问题，如您继续提出敏感问题，西鲸将做出封禁账号处理。感谢您的配合！'
  let xtextContent = oldCOntent || ''
  // @ts-ignore;
  EventSource = SSE
  const baseUrl = window.localStorage.getItem('open-base') || 'https://api.ioii.cn'
  var apiUrl = aiType === 'message' ? `${baseUrl}/v1/chat/completions` : `${baseUrl}/v1/images/generations`
  // const apiUrl = "https://api.openaixx.com/v1/inner/search";
  let params = {
    ...data,
  }
  delete params.path
  const evtSource = new EventSource(apiUrl, {
    // @ts-ignore
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('open-key'),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    payload: JSON.stringify(params),
    // payload: params,
  })


  evtSource.onopen = function () {}

  evtSource.onmessage = async function (e) {
    clearInterval(timerOut)
    timerOutCount = 0
    needTimeOut = false
    timerOut = setInterval(async () => {
      if (needTimeOut && timerOutCount > TIMEOUT) {
        await report({
          content: {
            userInfo: localStorage.getItem('userInfo'),
            date: new Date(),
            payload: params,
            type: '超时错误',
          },
        })
        clearInterval(timerOut)
        timerOutCount = 0
        options.onEnd({ content: xtextContent, canResend: true })
        evtSource.close()
        return
      }
      timerOutCount += 1
    }, 1000)
    try {
      const response = JSON.parse(evtSource?.xhr?.response || '{}')
      if (response?.code === 40003 || response?.code === 40001) {
        toast.error('请重新登录～')
        // location.href = `/login?redirect=${window.location.href || '/'}`
        return
      }
    } catch {}
    const msg = e?.data
    try {
      const { recordId } = JSON.parse(msg || '{}') || {}
      if (recordId) currentRecordId = recordId
    } catch {}
    // 结束
    if (msg.indexOf('[DONE]') !== -1) {
      evtSource.close()
      // if(!chatEnd){
      //   chatEnd = true;
      //   const res = await checkContent({
      //     text: xtextContent,
      //     recordId: currentRecordId,
      //     scene: options?.scene || 3,
      //   })
      //   if (!res) xtextContent = checkErrorMsg
      // }
      options.onEnd({ content: xtextContent, status: 'finish', recordId: currentRecordId  })
      clearInterval(timerOut)
      return
    }else if (msg.indexOf(`"finish_reason":"stop"`) !== -1) {
      //敏感检测
      const resultData = JSON.parse(e?.data || '{}')
      evtSource.close()
      clearInterval(timerOut)
      xtextContent += resultData?.choices?.[0]?.delta?.content || ''
      // console.log('finish_reasonstop:checkContent', xtextContent)
      // if(!chatEnd){
      //   chatEnd = true;
      //   const res = await checkContent({
      //     text: xtextContent,
      //     recordId: currentRecordId,
      //     scene: options?.scene || 3,
      //   })
      //   if (!res) xtextContent = checkErrorMsg
      // }

      options.onEnd({ content: xtextContent, status: 'finish',recordId: currentRecordId })
      return
    } else if (msg.indexOf(`"finish_reason":"length"`) !== -1) {
      //长度限制
      evtSource.close()
      timerOutCount = 0
      clearInterval(timerOut)
      xtextContent += resultData?.choices?.[0]?.delta?.content || ''
      openAi(data, options, xtextContent)
    }
    const resultData = JSON.parse(e?.data || '{}')
    const fileList = resultData?.fileList
    if (fileList) {
      options.onFile && options.onFile(fileList)
    }
    xtextContent += resultData?.choices?.[0]?.delta?.content || ''
    // if (xtextContent?.length > 100 && !isCheckContent) {
    //   isCheckContent = true
    //   const res = await checkContent({
    //     text: xtextContent,
    //     recordId: currentRecordId,
    //     scene: options?.scene || 3,
    //   })
    //   if (res) {
    //     options.onMessage({ content: xtextContent ,recordId: currentRecordId})
    //   } else {
    //     options.onEnd({ content: checkErrorMsg, status: 'finish' })
    //     evtSource.close()
    //   }
    //   return
    // }

    options.onMessage({ content: xtextContent })
  }

  evtSource.onerror = async function () {

    clearInterval(timerOut)
    timerOutCount = 0
    if (errorTryCount >= 2) {
      options.onEnd({ content: xtextContent, canResend: true })
      await report({
        content: {
          userInfo: localStorage.getItem('userInfo'),
          date: new Date(),
          payload: params,
          type: 'EventSource Error',
        },
      })
      console.log('EventSource failed.')
    } else {
      errorTryCount++
      console.log('EventSource_failed_TRY')
      openAi(data, options, xtextContent)
    }
  }

  // evtSource.addEventListener(
  //   'ping',
  //   function (e) {
  //     console.log('ping')
  //     console.log(e.data, 'pingData')
  //   },
  //   false
  // )
  // @ts-ignore;
  evtSource.stream()

  const close = () => {
    clearInterval(timerOut)
    evtSource.close()
  }
  return {
    close,
  }
}

export const openAiCreateImg = params => request.post(`${XIJING_API_URL}/v1/images/generations`, params)

export const getCateList = params => request.post(`${XIJING_API_URL}/v1/service/cateList`, params)
// 模型列表
export const getModelList = (params) => request.post(`${XIJING_API_URL}/v1/service/site/modelList`,params)
