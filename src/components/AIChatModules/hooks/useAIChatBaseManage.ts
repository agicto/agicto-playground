// @ts-nocheck
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { AppCellProps, ChatStateProps, DialogCellProps } from '@/components/AIChatModules'
import { createAppDialog, delDialog, userDialogList } from '@/services/chat'
import { message } from 'antd'
import { getModelList, getUserWorkAppList } from '@/services/home'
import { notLoginCode } from '@/utils/request'
import { checkServer, isPc } from '@/utils'
import { getQiniuToken } from '@/services'

const CACHE_DIALOG_ID_NAME = 'CACHE_DIALOG_ID'

export const useAIChatBaseManage = (defaultModel?: any) => {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  const [qiNiuToken, setQiNiuToken] = useState('')
  const [openFormValues, setOpenFormValues] = useState({})
  const [openImgFormValues, setOpenImgFormValues] = useState({})

  // 数据模型
  const [chatState, setChatState] = useState<ChatStateProps>({
    currentDialogId: '',
    dialogList: [],
    appList: [],
    knowledgeId: '',
    isPc: false,
    chatModules: [],
    chatModuleIds: [],
  })
  const checkIsPc = useMemo(() => {
    return isPc()
  }, [])
  const currentDialog = useMemo<DialogCellProps | undefined>(() => {
    const dialog = chatState.dialogList?.find(v => v.dialogId == chatState.currentDialogId)
    return dialog
  }, [chatState.dialogList, chatState.currentDialogId])

  const currentApp = useMemo<AppCellProps | undefined>(() => {
    const app = chatState.appList?.find(v => v.appId === currentDialog?.appId)
    return app
  }, [currentDialog, chatState.appList])
  const mergeUpdateChatState = (state: ChatStateProps) => {
    setChatState(pre => ({ ...pre, ...state }))
  }

  const getApp = async () => {
    const res = await getUserWorkAppList()
    const appList = res?.data?.recordList
    mergeUpdateChatState({
      appList,
    })
  }

  const getDialogList = async (queryDialogId?: string) => {
    const res = await userDialogList()
    const dialogList: DialogCellProps[] = res?.data?.recordList || []
    mergeUpdateChatState({
      dialogList,
    })
    if (queryDialogId) {
      const current = dialogList.find(item => Number(item.dialogId) === Number(queryDialogId))
      mergeUpdateChatState({
        currentDialogId: current?.dialogId,
      })
    }
  }
  const onDeleteDialog = async dialogId => {
    try {
      const res = await delDialog({ dialogId })
      if (res.code === 0) {
        messageApi.open({
          type: 'success',
          content: '删除成功～',
        })
        if (dialogId === currentDialog?.dialogId) {
          sessionStorage.removeItem(CACHE_DIALOG_ID_NAME)
          mergeUpdateChatState({
            currentDialogId: '',
          })
        }
        getDialogList()
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '删除失败～',
      })
    }
  }

  const onCreateDialog = async (e: any) => {
    const { name, dialogId, knowledgeId, appId, isEdit } = e || {}
    const modelIds=chatState.chatModuleIds ||[] 
  

    mergeUpdateChatState({
      chatModuleIds: [modelIds[0] || '2']
    })
    await getDialogList()
  }
  const updateCurrentApp = (appId?: string) => {
    if (!currentDialog) {
      messageApi.open({
        type: 'warning',
        content: '请选择会话',
      })
    } else {
      onCreateDialog({ appId: appId, knowledgeId: '', dialogId: currentDialog?.dialogId, isEdit: true })
    }
  }

  const chatItemAction = config => {
    const { action, dialogId, rename, item } = config
    switch (action) {
      case 'select':
        if (currentDialog?.dialogId !== dialogId && dialogId) {
          sessionStorage.setItem(CACHE_DIALOG_ID_NAME, dialogId)
          mergeUpdateChatState({
            currentDialogId: dialogId,
          })
        }
        break
      case 'rename':
        onCreateDialog({
          name: rename,
          dialogId,
          isEdit: true,
          appId: item?.appId,
        })
        break
      case 'del':
        onDeleteDialog(dialogId)
        break
      default:
        break
    }
  }
  const getModules = async (params = {}, type) => {
    mergeUpdateChatState({
      chatModules:  [],
      chatModuleIds: []
    })
    const response = await getModelList({
      ...params,
      pageSize: 1000
    })

    const data = response.data.recordList
    const defaultModuleId = data?.[0]
    mergeUpdateChatState({
      chatModules: data || [],
      chatModuleIds: [ type === 'init' ? defaultModel || defaultModuleId?.apiModelName || 'gpt-3.5-turbo' :  defaultModuleId?.apiModelName || 'gpt-3.5-turbo' ]
    })
  }
  const initData = async () => {
    // const { data: { token } } = await getQiniuToken()
    // setQiNiuToken(token)
  }
  useEffect(() => {
    initData()
  }, [])
  return {
    qiNiuToken,
    chatState,
    currentDialog,
    currentApp,
    messageApi,
    contextHolder,
    isPC: checkIsPc,
    getDialogList,
    mergeUpdateChatState,
    onDeleteDialog,
    getApp,
    onCreateDialog,
    updateCurrentApp,
    chatItemAction,
    getModules,
    openFormValues,
    setOpenFormValues,
    openImgFormValues,
    setOpenImgFormValues
  }
}
