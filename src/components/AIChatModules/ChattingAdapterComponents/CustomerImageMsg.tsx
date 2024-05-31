// @ts-nocheck
import React, { FC, useMemo, useState, useImperativeHandle, forwardRef, useContext } from 'react'
import { Button, Modal, Upload, Image, message, Popover } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile as OriginUploadFile } from 'antd/es/upload/interface'
import Img from "next/image"
import { v4 as uuidv4 } from 'uuid'
import { UploadFileStatus } from 'antd/es/upload/interface'
import { AIChatContext } from '../AIChatContext'
import { BASE_CDN_URL, QiNiuUpload, handlerSelectImageFile } from '@/utils/qiniuTools'
import vector from "@/images/chat/Vector.png"
export interface UploadFile extends OriginUploadFile {
  file?: File
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

interface CustomerImageMsgSenderProps {
  imageFileList?: any[]
  children?: any
  siteConfig?: any
  currentModuleId?: number | string
}

export const formatFileToUploadFile = async (file: File): Promise<UploadFile> => {
  const url = await getBase64(file)
  return {
    uid: uuidv4(),
    file,
    name: file.name,
    status: 'done',
    url,
  }
}
export const formatFileToUploadFileStatus = (file: UploadFile, status?: UploadFileStatus): UploadFile => {
  if (!status) {
    return file
  }
  return {
    ...file,
    status,
  }
}

export const CustomerImageMsgSender = forwardRef((props: CustomerImageMsgSenderProps, ref) => {
  const { siteConfig } = props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const { qiNiuToken, mergeUpdateChatState } = useContext(AIChatContext)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const [uploading, setUploading] = useState(false)

  const handlerSelect = () => {
    // if (currentModuleId != 2) {
    //   return
    // }
    const onComplete = async (list: File[]) => {
      const formatList: UploadFile[] = []
      for (let i = 0; i < list.length; i++) {
        const file = await formatFileToUploadFile(list[0])
        formatList.push(file)
      }
      setFileList(formatList)
    }
    handlerSelectImageFile({
      maxCount: 1,
      onComplete,
    })
  }
  /**
   * @description 先暂时只考虑一个图片
   * */
  const handleUpload = async () => {
    if (!fileList.length) return []
    return new Promise(resolve => {
      // const resList: string[] = []
      setUploading(true)
      setFileList(pre => {
        return pre.map(v => formatFileToUploadFileStatus(v, 'uploading'))
      })
      const currentFile = fileList[0]
      const onComplete = e => {
        const imageUrl = BASE_CDN_URL + e.key
        // resList.push(imageUrl)
        // setFileList(pre => {
        //   return pre.map((v) => {
        //     return formatFileToUploadFileStatus(v, 'done')
        //   })
        // })
        setFileList([])
        setUploading(false)
        return resolve({ imageList: [imageUrl], fileList })
      }
      const config = new QiNiuUpload({
        token: qiNiuToken,
        error: e => {
          console.log('upload error', e)
          message.error(e.data.error)
          setFileList(pre => {
            return pre.map(v => {
              return formatFileToUploadFileStatus(v, 'error')
            })
          })
          setUploading(false)
          return resolve([])
        },
        complete: onComplete,
      })
      config.start(currentFile.file)
    })
  }

  const uploadProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])

      return false
    },
    fileList,
    listType: 'picture-card',
    onPreview: handlePreview,
    onChange: handleChange,
  }
  const reset = () => {
    setFileList([])
  }
  useImperativeHandle(ref, () => {
    return {
      handleUpload,
      reset,
    }
  })
  const Content = () => {
    return (
      <div className={'w-[400px]'}>
        <div>
          AI识图功能将默认使用Chat GPT4识别，使用此功能将消耗您的水滴哦~
        </div>
        <div className={'flex mt-[10px]'}>
          {/*disabled={currentModuleId == '2'}*/}
          {/* <Button type={'primary'}
                  onClick={() => mergeUpdateChatState && mergeUpdateChatState({ chatModuleIds: ['2'] })}>
            切换至ChatGPT 4
          </Button> */}
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Upload {...uploadProps} className={fileList.length ? 'p-[20px_10px_12px_10px] bg-[rgba(0,0,0,0.04)]' : ""} />
      {props.children}
      {siteConfig?.showImgMsgSender && <div className={'relative h-[0px] w-full'}>
        <Popover placement="topLeft" title={<div className='flex items-center '><i className='xijing mr-1 xijingbg-warning text-[#FAAD14]' />温馨提示</div>} content={Content}>
          <Button
            type="text"
            size={'small'}
            onClick={handlerSelect}
            loading={uploading}
            style={{ height: "40px" }}
            className={'absolute w-[40px] h-[40px] border box-border border-solid border-gray-200 top-[11px] left-[10px]'}
          >
            <Img src={vector} alt={''} />
          </Button>
        </Popover>
      </div>}
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
})

interface CustomerImageMsgProps {
  fileList?: string[]
}

/**
 * @description 木偶组件，纯粹处理视图
 * */
export const CustomerImageMsg: FC<CustomerImageMsgProps> = props => {
  const fileList = useMemo<string[]>(() => {
    if (!props.fileList) {
      return []
    }
    return props.fileList
  }, [props.fileList])

  return (
    <>
      {fileList.length ? (
        <div className={'ant-upload-list ant-upload-list-picture-card flex flex-row flex-wrap'}>
          {fileList?.map(item => (
            <div className={'ant-upload-list-item-container w-[102px] mr-[8px]'} key={item}>
              <div className={'p-[8px] border-solid border-[#d9d9d9] border-[1px] rounded-xl'}>
                <Image src={item} preview={true} style={{ maxWidth: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
