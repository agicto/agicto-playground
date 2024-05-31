// @ts-nocheck
import * as qiniu from 'qiniu-js'
import { v4 as uuidv4 } from 'uuid'

export const defaultAvatar = 'https://ew6.cn/WechatIMG1719.jpg'

export const BASE_CDN_URL = 'https://ew6.cn/'

export const filetypes = {
  avatar: ['image/\\*'],
}

interface QiNiuUploadImageProps {
  key?: string
  putExtra?: any // 额外参数
  config?: any
  next?: any // 进程
  token: string
  error: any //
  complete: any
}

// 一次性消耗 用完即毁
export class QiNiuUploadImage {
  constructor(props: QiNiuUploadImageProps) {
    this.props = props
    this.pipelineStart()
  }

  private readonly props: QiNiuUploadImageProps
  public abort: any
  private inputDom
  private putExtra = {
    mimeType: filetypes.avatar,
  }

  private pipelineStart() {
    this.inputDom = document.createElement('input')
    this.inputDom.type = 'file'
    this.inputDom.accept = 'image/*'
    this.inputDom.onchange = val => {
      const imgFiles = val.target.files[0]
      // const imgBlob = URL.createObjectURL(imgFiles)
      this.pipelineQiNiu(imgFiles, imgFiles.name)
    }
    this.inputDom.click()
  }

  private pipelineQiNiu = (file: any, fileName: string) => {
    const { token, putExtra, config, next, error, complete } = this.props
    if (token) {
      const key = uuidv4()
      const observable = qiniu.upload(file, key, token, { ...this.putExtra, ...putExtra }, config)
      this.abort = observable.subscribe(next, error, complete)
    }
  }
}

export const handlerSelectImageFile = (options: { maxCount?: number; onComplete?: (list: File[]) => void; multiple?: boolean }) => {
  const inputDom = document.createElement('input')
  inputDom.type = 'file'
  inputDom.accept = 'image/*'
  if (options.multiple) {
    inputDom.multiple = true
  }
  inputDom.onchange = (val: any) => {
    const list = Object.values(val.target.files).filter((_, i) => i < (options.maxCount || 1)) as File[]
    options.onComplete && options.onComplete(list)
  }
  inputDom.click()
}

export class QiNiuUpload {
  protected props: QiNiuUploadImageProps

  constructor(props: QiNiuUploadImageProps) {
    this.props = props
  }

  public abort: any
  public start = (file?: File, fileType?: string) => {
    if (!file) return
    const { token, putExtra, config, next, error, complete } = this.props
    if (token) {
      const lastType = fileType || 'image/'
      // const type = file.type.replace(lastType, '.')
      const key = uuidv4() + lastType
      const observable = qiniu.upload(file, key, token, { ...putExtra }, config)
      this.abort = observable.subscribe(next, error, complete)
    }
  }
}
