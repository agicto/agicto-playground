import { FC } from 'react'

export type AppCellProps = {
  appId?: string
  cName?: string
  cid?: number
  copyright?: string
  desc?: string
  icon?: string
  iconBackground?: string
  isWorkSpace?: boolean
  name?: string
  status?: number
  type?: number
  uid?: number
}
export type DialogCellProps = {
  appId?: string | number
  dialogId?: number
  knowledgeId?: string
  name?: string
  top?: any
}

export type RecordCellProps = {
  content?: string
  id?: number | string
  isAnswer?: boolean
  msgTime?: string
  canResend?: boolean
  isPraise?: boolean
  imgList?: string[] // 初始化可能为false
  modelId?: number | string
  fileList?: any[],
  generateLoading?: boolean,
  imgUrl? : string
}

export type ChatModuleCell = {
  apiModelName: string
  modelName: string
  count?: number
  icon?: string
  consume?: number
}

export interface ChattingAdapterProps {
  siteConfig: any
  currentDialog?: DialogCellProps
  chatModuleIds?: string[]
  currentApp?: AppCellProps
  onCreateDialog?: any
  componentEmpty?: FC<any>
  chatModules?: any
  mergeUpdateChatState?: any
  kbId?: any
  sceneType?: string
  openFormValues?: any
  openImgFormValues?: any
  aiType?: string
  testModelList: {
    modelId: string | number
    modelName: string
    messages: RecordCellProps[]
  }[]
  setTestModelList: (value: any) => void
}

export interface ChatStateProps {
  currentDialogId?: string | null | string[] | number
  dialogList?: DialogCellProps[]
  knowledgeId?: string
  appList?: AppCellProps[]
  isPc?: boolean
  chatModules?: ChatModuleCell[]
  chatModuleIds?: string[]
}
