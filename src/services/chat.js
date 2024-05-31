import request from '../utils/request'
import { XIJING_API_URL } from '@/consts/env'

// 聊天对话窗口
export const userDialogList = params => request.post(`${XIJING_API_URL}/v1/service/chat/userDialogList`, params)

/**
 *  创建编辑聊天对话窗口
 * appld 会话ID
    name 会话名
    knowledgeId 知识库id
 * */
export const createAppDialog = params => request.post(`${XIJING_API_URL}/v1/service/chat/createDialog`, params)

/**
 * 聊天对话窗口
 * dialogld
 * */
export const delDialog = params => request.post(`${XIJING_API_URL}/v1/service/chat/delDialog`, params)

export const recordList = params => request.post(`${XIJING_API_URL}/v1/service/chat/recordList`, params)

// 点赞
export const record = params => request.post(`${XIJING_API_URL}/v1/service/chat/labelRecord`, params)

export const debugRecordList = params => request.post(`${XIJING_API_URL}/v1/service/chat/debugRecordList`, params)

export const latestRecordIdList = params => request.post(`${XIJING_API_URL}/v1/service/chat/latestRecord`, params)

/**
 * @desc 点赞\点踩、复制
 * */

export const setLabelRecord = params => request.post(`${XIJING_API_URL}/v1/service/chat/labelRecord`, params)

/**
 * @desc 获取最新消息recordId
 * */

export const getLatestRecord = params => request.post(`${XIJING_API_URL}/v1/service/chat/latestRecord`, params)

export const violationContent = params => request.post(`${XIJING_API_URL}/v1/service/chat/violation`, params)
// 置顶
export const setTopDialog = params => request.post(`${XIJING_API_URL}/v1/service/chat/setTopDialog`, params)
// 清空聊天会话记录
export const clearDialogRecord = params => request.post(`${XIJING_API_URL}/v1/service/chat/clearDialogRecord`, params)
// 中断聊天会话记录
export const interrupt = params => request.post(`${XIJING_API_URL}/v1/service/chat/interrupt`, params)

//会话设置
export const saveChatSet = params => request.post(`${XIJING_API_URL}/v1/service/saveChatSet`, params)

export const getChatSet = params => request.post(`${XIJING_API_URL}/v1/service/getChatSetInfo`, params)
