// @ts-nocheck

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Input, Modal, Popconfirm, Popover, Select, Radio, message, Row, Col } from 'antd'
import { motion } from 'framer-motion'
import Empty from './Empty'
import { Markdown } from '@/components/Markdown'
import { ChattingAdapterProps, RecordCellProps } from '../AIChat.type'
import { clearDialogRecord, interrupt, getLatestRecord, recordList, saveChatSet, getChatSet } from '@/services/chat'
import { getUserkeyList, openAi, openAiCreateImg } from '@/services/home.js'
import { UserImg } from './HeaderImage'
import { AIAnswer } from './AIAnswer'
import { AIImgAnswer } from './AIImgAnswer'
import { isEmpty } from 'lodash'
import { CustomerImageMsg, CustomerImageMsgSender } from './CustomerImageMsg'
import { PauseOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled, InfoCircleFilled, CodeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import SetAIModules from '../SetAIModules'
import { isPc, checkServer } from '@/utils'
import { IconHorn } from '@/icons/IconHorn'
import { IconHornChecked } from '@/icons/IconHornChecked'
import { IconSetting } from '@/icons/IconSetting'
import copyValue from 'copy-to-clipboard'

const { TextArea } = Input

const CHAT_URL = '/v1/service/chat/completions'
const KB_CHAT_URL = '/v1/service/kbs/chat'

const getCode = (type: 'Python' | 'JavaScript' | 'Curl', params: any) => {
  if (type === 'Python') {
    return `
import requests
endpoint = 'https://api.ioii.cn/v1/chat/completions'
res = requests.post(endpoint, json=${JSON.stringify(params, 2)},
  headers={
  "Authorization": "Bearer sk-meZNPr8fTuZa3dIgomIQZAHVoHQBRBXU9ehsIXaVYW8NeMrC",
})
`
  } else if (type === 'Curl') {
    return `
curl 'https://api.ioii.cn/v1/chat/completions' \
  -H 'authority: api.ioii.cn' \
  -H 'accept: */*' \
  -H 'authorization: Bearer sk-meZNPr8fTuZa3dIgomIQZAHVoHQBRBXU9ehsIXaVYW8NeMrC' \
  -H 'content-type: application/json' \
  --data-raw '${JSON.stringify(params)}' \
  --compressed
`
  } else {
    return `
fetch("https://api.ioii.cn/v1/chat/completions", {
  "headers": {
    "accept": "*/*",
    "authorization": "Bearer sk-meZNPr8fTuZa3dIgomIQZAHVoHQBRBXU9ehsIXaVYW8NeMrC",
    "content-type": "application/json",
  },
  "body": '${JSON.stringify(params)}',
  "method": "POST"
});
`
  }
}

const memoryParams = [
  {
    name: '无记忆力',
    key: 1
  },
  {
    name: '标准',
    key: 2
  },
  {
    name: '记忆增强',
    key: 3
  }
]
export const AIChatting: React.FC<ChattingAdapterProps> = props => {
  const {
    currentDialog,
    onCreateDialog,
    currentApp,
    chatModuleIds,
    kbId,
    sceneType,
    chatModules,
    mergeUpdateChatState,
    openFormValues,
    openImgFormValues,
    aiType,
    testModelList,
    setTestModelList
  } = props
  const siteConfig = { showImgMsgSender: true, showModel: true, ...props.siteConfig }
  const [inputText, setInputText] = useState('')
  const [apiKey, setApiKey] = useState(!checkServer() ? window.localStorage.getItem('open-key') : '')
  const [baseUrl, setBaseUrl] = useState(!checkServer() ? window.localStorage.getItem('open-base') : 'https://api.ioii.cn')
  const [imgInputText, setImgInputText] = useState('')

  // const [recordText, setRecordText] = useState('')
  const [record, setRecord] = useState<RecordCellProps[]>([])

  const [recordImg, setRecordImg] = useState<RecordCellProps[]>([])

  const [generateLoading, setGenerateLoading] = useState<boolean>(false)
  const [generateImgLoading, setGenerateImgLoading] = useState<boolean>(false)

  const [currentAnswerId, setCurrentAnswerId] = useState<any>(0)
  const [voices, setVoices] = useState([])
  const [checkedVoice, setCheckedVoice] = useState({})
  const [modelId, setModelId] = useState('1')
  const [memory, setMemory] = useState(1)
  const [chatSetting, setChatSetting] = useState<any>({})

  const textareaRef = useRef<any>(null)
  const messageRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const openAIClose = useRef<any>(null)
  const customerImageMsgSenderRef = useRef<any>()
  const modulesIdOption = useMemo(() => {
    return {
      isSingle: Number(chatModuleIds?.length) > 1,
      currentId: chatModuleIds ? chatModuleIds[0] : '2'
    }
  }, [chatModuleIds])
  const [autoPlay, setAutoPlay] = useState(false)
  const [setting, changeSetting] = useState(false)
  const [codeOpen, setCodeOpen] = useState(false)
  const [checkCode, setCheckCode] = useState('Python')

  const { confirm } = Modal
  const router = useRouter()

  const msgToBottom = () => {
    setTimeout(() => {
      messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 0)
  }

  const imgToBottom = () => {
    setTimeout(() => {
      imageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 0)
  }
  const onAbort = () => {
    openAIClose.current && openAIClose.current?.close()
    setGenerateLoading(false)
    setInputText('')
    // if (kbId) {
    //   const current = record[record.length - 1]
    //   current.generateLoading = false
    //   stopChat({
    //     recordId: current.id,
    //     sceneType: 1,
    //     text: current.content
    //   })
    // }
  }

  const getRecord = async id => {
    let appRecordRes: any = {}
    if (kbId) {
      // appRecordRes = await chatRecordList({
      //   kbId,
      // })
    } else {
      appRecordRes = await recordList({
        dialogId: id
      })
    }
    const list = appRecordRes?.data?.recordList || []
    setRecord(list)
    getChatSet().then(res => {
      mergeUpdateChatState({
        chatModuleIds: [`${list[list.length - 1]?.apiModelName || res?.data?.apiModelName}`]
      })
    })
  }

  const onSubmit = async (options?: any) => {
    openAIClose.current = null

    if (options?.type === 'isRepeat') setGenerateLoading(false)
    let newList = [...testModelList]

    testModelList.forEach((model, modexIndex) => {
      openAIClose.current = null

      let record = [...model.messages]
      const answerData: RecordCellProps = {
        id: (new Date().getTime() / 1000) * Math.random(),
        content: '',
        isAnswer: true,
        modelId: modulesIdOption.currentId
      }
      let sendData = {}
      let paramsData = {}
      let messageContent = options?.type === 'isRepeat' ? options?.data?.message : inputText
      const { imageList = [] } = options || {}
      sendData = {
        id: (new Date().getTime() / 1000) * Math.random(),
        content: messageContent,
        isAnswer: false,
        imgList: imageList
      }

      const list: RecordCellProps[] = JSON.parse(JSON.stringify(record))
      list.push(sendData, answerData)
      setCurrentAnswerId(list[list.length - 1].id)
      newList = newList.map(item => {
        if (item.modelName === model.modelName) {
          return {
            ...model,
            messages: [...list]
          }
        }
        return item
      })
      setTestModelList(newList)
      const innerOpenFormValues = { ...openFormValues }
      delete innerOpenFormValues.prompt
      try {
        paramsData = {
          messages: [
            {
              role: 'system',
              content: openFormValues?.prompt || 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: messageContent
            }
          ],
          model: model.modelName || 'gpt-3.5-turbo',
          stream: true,
          ...innerOpenFormValues
        }

        const options = {
          scene: kbId ? 3 : 1,
          onFile: files => {},
          onMessage: async data => {
            const newMsg = data?.content
            list[list.length - 1].content = newMsg

            newList = newList.map(item => {
              if (item.modelName === model.modelName) {
                return {
                  ...model,
                  messages: [...list]
                }
              }
              return item
            })
            setTestModelList(newList)
          },
          onEnd: async data => {
            console.log(model.modelName, modexIndex, 'onEnd')

            setGenerateLoading(false)
            const newMsg = data?.content
            list[list.length - 1].content = newMsg
            if (data.canResend) {
              list[list.length - 1].canResend = true
            }
            try {
              if (data.status === 'finish') {
                newList = newList.map(item => {
                  if (item.modelName === model.modelName) {
                    return {
                      ...model,
                      messages: [...list]
                    }
                  }
                  return item
                })
                setTestModelList(newList)
                setInputText('')
              }
            } catch (e) {
              console.error(e)
              setTestModelList(
                newList.map(item => {
                  if (item.modelName === model.modelName) {
                    return {
                      ...model,
                      messages: [...list]
                    }
                  }
                  return item
                })
              )
            }
          }
        }
        openAi(paramsData, options)
        // openAIClose.current =
      } catch (err) {
        console.log(err, 'error')
        setGenerateLoading(false)
      }
    })
  }

  const submit = async () => {
    if (generateLoading) return
    const userInfo = localStorage.getItem('userInfo') || '{}'

    if (!inputText) return message.error('请输入问题')

    // const { imageList, fileList } = await customerImageMsgSenderRef.current.handleUpload()
    await onSubmit({ type: '1', imageList: [], fileList: [] })
    setInputText('')
    setGenerateLoading(true)
  }

  const submitImg = async () => {
    if (!imgInputText) return message.error('请输入图片提示词')

    setGenerateImgLoading(true)

    const answerData: RecordCellProps = {
      id: (new Date().getTime() / 1000) * Math.random(),
      imgUrl: [],
      errorText: '',
      isAnswer: true
    }

    let sendData = {}
    let paramsData = {}

    sendData = {
      id: (new Date().getTime() / 1000) * Math.random(),
      content: imgInputText,
      isAnswer: false,
      imgList: []
    }

    const list: RecordCellProps[] = JSON.parse(JSON.stringify(recordImg))
    list.push(sendData, answerData)
    setRecordImg(JSON.parse(JSON.stringify(list)))
    paramsData = {
      model: chatModules?.find(item => item.apiModelName === chatModuleIds?.[0])?.apiModelName || 'dall-e-3',
      prompt: imgInputText,
      ...openImgFormValues
    }
    // try {
    const response = await openAiCreateImg(paramsData)
    if (!isEmpty(response)) {
      if (response?.data) {
        const newImgUrl = response?.data
        list[list.length - 1].imgUrl = newImgUrl
      } else if (response?.error) {
        list[list.length - 1].errorText = response?.error?.message
      }
      setGenerateImgLoading(false)
    } else {
      list[list.length - 1].errorText = '图片生成失败，请检查网络环境'
      setGenerateImgLoading(false)
    }
    setRecordImg(JSON.parse(JSON.stringify(list)))
    setImgInputText('')

    // } catch (err) {
    //   console.log(err, 'err')

    // }
  }

  const handleKeyUp = async event => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      if (aiType === 'message') {
        await submit()
      } else if (aiType === 'image') {
        submitImg()
      }
    }
  }

  const saveSetting = async () => {
    // await saveChatSet({ modelId: +modelId, memoryType: memory })
    apiKey && window.localStorage.setItem('open-key', apiKey)
    baseUrl && window.localStorage.setItem('open-base', baseUrl)
    changeSetting(false)
  }
  const onItemClick = item => {
    if (textareaRef.current) {
      textareaRef.current.value = item
    }
    setInputText(item)
  }

  const getChatSetting = () => {
    getChatSet().then(res => {
      setModelId(`` + res?.data?.apiModelName)
      setMemory(res?.data?.memoryType)
      // mergeUpdateChatState({
      //   chatModuleIds: [`${res?.data?.apiModelName}`]
      // })
      setChatSetting(res?.data || {})
    })
  }
  const getEmpty = () => {
    if (props.componentEmpty) {
      return <props.componentEmpty />
    }
    return <Empty onItemClick={onItemClick} />
  }

  useEffect(() => {
    if (!generateLoading) {
      if (currentDialog?.dialogId || kbId) {
        getRecord(currentDialog?.dialogId)
      } else {
        setRecord([])
      }
    }
  }, [currentDialog])

  useEffect(() => {
    msgToBottom()
  }, [record])

  useEffect(() => {
    imgToBottom()
  }, [recordImg])

  useEffect(() => {
    getChatSetting()
  }, [])

  return (
    <div className=" h-full flex flex-col">
      <div
        className={`${
          !isPc() && 'h-[calc(100vh_-_315px)] flex-none'
        } flex flex-col flex-1 center relative grow  overflow-auto bg-white p-[15px]`}
      >
        {aiType === 'message' ? (
          <>
            {(testModelList[0]?.messages?.length || 0) === 0 && (
              <div className="bg-[#F2F8FF] h-full flex-none overflow-auto">{getEmpty()}</div>
            )}
            <Row gutter={8}>
              {testModelList.map(model => {
                return (
                  <Col span={24 / testModelList.length || 24} key={model.modelName}>
                    <div ref={messageRef} className="bg-white" key={model.modelName}>
                      {model.messages?.map((item, index) => {
                        return (
                          <div key={index} className="">
                            {item.isAnswer ? (
                              <AIAnswer
                                onResend={submit}
                                item={item}
                                index={index}
                                onSubmit={onSubmit}
                                siteConfig={siteConfig}
                                generateLoading={generateLoading}
                                record={model.messages}
                                onAbort={onAbort}
                                sceneType={sceneType === 'kb' ? 1 : 2}
                                autoPlay={autoPlay}
                                currentId={currentAnswerId}
                                setCurrentAnswerId={setCurrentAnswerId}
                                voices={voices}
                                checkedVoice={checkedVoice}
                              />
                            ) : (
                              <motion.div
                                initial={{ x: 100 }}
                                animate={{ x: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 260,
                                  damping: 20
                                }}
                              >
                                <div className={`flex justify-end py-[20px] ${isPc() ? 'px-[24px]' : ' px-[15px]'}`}>
                                  {/* <div className='flex w-[35px] h-[35px] rounded-full p-1 items-center border justify-center border-solid border-[#E8E8E8] flex-none'> */}
                                  <UserImg />
                                  {/* </div> */}
                                  <div className="mr-2 w-full py-3 pt-0 pl-[10px]">
                                    <CustomerImageMsg fileList={item.imgList} />
                                    <Markdown content={item.content || ''} />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </Col>
                )
              })}
            </Row>
          </>
        ) : (
          <>
            <div ref={imageRef} className="bg-white">
              {recordImg?.map((item, index) => {
                return (
                  <div key={index} className="">
                    {item.isAnswer ? (
                      <AIImgAnswer
                        generateImgLoading={generateImgLoading}
                        item={item}
                        openImgFormValues={openImgFormValues}
                        index={index}
                        recordImg={recordImg}
                      />
                    ) : (
                      <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20
                        }}
                      >
                        <div className={`flex justify-end py-[20px] ${isPc() ? 'px-[30px]' : ' px-[15px]'}`}>
                          <UserImg />
                          <div className="mr-2 w-full py-3 pt-0 pl-[10px]">
                            <CustomerImageMsg fileList={item.imgList} />
                            <Markdown content={item.content || ''} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <div className="border-solid border-t-0 border-gray-200 box-border shrink-0	 flex items-center flex-col bg-[#ffffff]  pl-[10px] pr-[10px]">
        {!isPc() && (
          <div className="px-[12px] py-[10px] text-md text-[#666666] text-[12px] ">
            请遵守
            <a className="font-bold text-[#3162FF] cursor-pointer text-[12px]" href="/security">
              内容安全协议
            </a>
            ，禁止提交违规内容，违规内容会被系统拦截，严重者可能会被注销账号。
          </div>
        )}
        {aiType === 'message' ? (
          // <CustomerImageMsgSender ref={customerImageMsgSenderRef} currentModuleId={modulesIdOption.currentId} siteConfig={siteConfig}>
          <TextArea
            ref={textareaRef}
            value={inputText}
            autoSize={{ minRows: 1, maxRows: 8 }}
            onPressEnter={handleKeyUp}
            onChange={e => {
              setInputText(e?.target?.value)
            }}
            className="block  h-[60px] md:h-[80px] p-2 md:p-5 md:leading-[25px] border-0  focus:border outline-0  box-border resize-none w-full text-lg font-[600] text-gray-900 border-solid border-gray-200 border-y rounded-none "
            placeholder="输入您的问题，可通过enter发送，或使用shift+enter换行"
          />
        ) : (
          // </CustomerImageMsgSender>
          <TextArea
            // ref={textareaRef}
            value={imgInputText}
            autoSize={{ minRows: 2, maxRows: 8 }}
            onPressEnter={handleKeyUp}
            onChange={e => {
              setImgInputText(e?.target?.value)
            }}
            className="block  h-[60px] md:h-[80px] p-2 md:p-5 md:leading-[25px] border-0  focus:border outline-0  box-border resize-none w-full text-lg font-[600] text-gray-900 border-solid border-gray-200 border-y rounded-none "
            placeholder="输入图片提示词"
          />
        )}

        <div className={'w-full h-[64px] box-border flex py-[10px] justify-between  items-center '}>
          {isPc() && (
            <div className="px-[20px] py-[10px] text-md text-[#666666] ">
              {/* 请遵守
              <a className="font-bold text-[#3162FF] cursor-pointer" href="/security">
                内容安全协议
              </a> */}
              开发者AI模型调试平台，仅用于开发调试使用，一键配置 50+模型，去配置：
              <a href="https://agicto.com" target="_blank">
                https://agicto.com
              </a>
            </div>
          )}
          <div className="flex items-center">
            {/* <Popover
              title={
                <>
                  <ExclamationCircleFilled style={{ color: '#FAAD14' }} />
                  <span className='bold ml-[12px]'>温馨提示</span>
                </>
              }
              placement="topLeft"
              content={<>
                <div >将所有对话自动语音播放（可通过设置栏选择个性化声音）</div>
              </>}
            >
              <div onClick={() => { setAutoPlay(!autoPlay) }} className={`${autoPlay ? 'border-[#3162FF]' : 'border-[#E4E4E4]'} flex cursor-pointer mr-[10px] w-[40px] h-[40px] border border-solid items-center	justify-center	rounded-[4px]	`}>
                {autoPlay ? <IconHornChecked className='cursor-pointer text-[#595959]' color={'#3162FF'} /> : <IconHorn className='cursor-pointer  text-[#595959]' color={'#595959'} />}
              </div>
            </Popover> */}

            {aiType === 'message' && (
              <>
                <Popover
                  placement="topLeft"
                  content={
                    <>
                      <div>查看代码</div>
                    </>
                  }
                >
                  <div
                    onClick={() => {
                      setCodeOpen(true)
                    }}
                    className={`${
                      codeOpen ? 'border-[#3162FF]' : 'border-[#E4E4E4]'
                    } flex cursor-pointer mr-[10px] w-[40px] h-[40px] border border-solid items-center	justify-center	rounded-[4px]	`}
                  >
                    {codeOpen ? (
                      <CodeOutlined className="cursor-pointer text-[#595959] " color={'#3162FF'} />
                    ) : (
                      <CodeOutlined className="cursor-pointer   text-[#000]" color={'#000'} />
                    )}
                  </div>
                </Popover>
                <Popover
                  title={
                    <>
                      <ExclamationCircleFilled style={{ color: '#FAAD14' }} />
                      <span className="bold ml-[12px]">温馨提示</span>
                    </>
                  }
                  placement="topLeft"
                  content={
                    <>
                      <div>支持对大模型进行更多个性化设置，满足您的多样需求</div>
                    </>
                  }
                >
                  <div
                    onClick={() => {
                      changeSetting(true)
                    }}
                    className={`${
                      setting ? 'border-[#3162FF]' : 'border-[#E4E4E4]'
                    } flex cursor-pointer mr-[10px] w-[40px] h-[40px] border border-solid items-center	justify-center	rounded-[4px]	`}
                  >
                    {setting ? (
                      <IconSetting className="cursor-pointer text-[#595959] " color={'#3162FF'} />
                    ) : (
                      <IconSetting className="cursor-pointer   text-[#000]" color={'#000'} />
                    )}
                  </div>
                </Popover>
                {/* <Popconfirm
                  title="温馨提示"
                  placement="topLeft"
                  description={
                    <>
                      <div />
                      请确认是否切断当前AI的记忆，切断后，
                      <div>AI将不参考之前的问答过程与你开启全新的交流。</div>
                      <div>此功能适合切换全新对话话题时使用。</div>
                    </>
                  }
                  onConfirm={async () => {
                    await interrupt({
                      dialogId: kbId ? '' : currentDialog?.dialogId,
                      ...(kbId ? { kbId } : {})
                    })
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <div
                    className={` flex w-[40px] h-[40px] border border-solid items-center	cursor-pointer justify-center	rounded-[4px] border-[#E4E4E4]	hover:border-[#3162FF] mr-[10px]`}
                  >
                    <span className='w-[18px] h-[18px] bg-[url("../images/chat/duab.png")] bg-cover  hover:bg-[url("../images/chat/duab2.png")] cursor-pointer' />
                  </div>
                </Popconfirm> */}
                <Popconfirm
                  title="温馨提示"
                  placement="topLeft"
                  description="是否清空当前页面的全部对话记录？"
                  onConfirm={async () => {
                    setRecord([])
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <div
                    className={` flex w-[40px] h-[40px] border border-solid items-center	justify-center	rounded-[4px] border-[#E4E4E4]	hover:border-[#3162FF] mr-[10px] cursor-pointer`}
                  >
                    <span className='w-[18px] h-[18px] mx-3 bg-[url("../images/chat/clear.png")] bg-cover  hover:bg-[url("../images/chat/clear2.png")] ' />
                  </div>
                </Popconfirm>
              </>
            )}

            {aiType === 'message' ? (
              <>
                {generateLoading ? (
                  <Button onClick={onAbort} className="w-[92px] hover:text-white text-white h-[40px] bg-[#000b4d] flex items-center">
                    {/* <i className="xijing xijingtingzhi text-white mr-2 text-[20px]" /> */}
                    <span className="text-black">停止</span>
                  </Button>
                ) : (
                  <Button onClick={submit} type={'primary'} className="w-[92px] h-[40px] flex items-center justify-center">
                    {/* <i className="xijing xijingchat text-white mr-2 text-[20px]" /> */}
                    发送
                  </Button>
                )}
              </>
            ) : (
              <>
                {generateImgLoading ? (
                  <Button className="w-[92px] hover:text-white text-white h-[40px] bg-[#000b4d] flex items-center">
                    {/* <i className="xijing xijingtingzhi text-white mr-2 text-[20px]" /> */}
                    <span className="text-black">正在生成中</span>
                  </Button>
                ) : (
                  <Button onClick={submitImg} type={'primary'} className="w-[92px] h-[40px] flex items-center">
                    {/* <i className="xijing xijingchat text-white mr-2 text-[20px]" /> */}
                    生成图片
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {setting && (
        <Modal
          maskClosable={false}
          title="AI助理 会话设置"
          open={setting}
          onCancel={() => changeSetting(false)}
          footer={null}
          style={{ top: '20%', width: '534px' }}
        >
          <div>
            <div className="flex justify-between mt-[16px] items-center border border-solid rounded-[8px] p-[16px] border-[#B5B5B5] h-[80px]">
              <div>
                <div className="text-[#000] font-bold	">设置BASE-URL</div>
              </div>
              <Input
                size="small"
                placeholder="请输入base-url"
                value={baseUrl}
                className="w-[200px] h-[40px] round"
                onChange={value => {
                  // setModelId(value)
                  setBaseUrl(value.target.value)
                }}
              ></Input>
            </div>
            <div className="flex justify-between mt-[16px] items-center border border-solid rounded-[8px] p-[16px] border-[#B5B5B5] h-[80px]">
              <div>
                <div className="text-[#000] font-bold	">设置API-KEY</div>
                <div className="text-[#1A1A1A]">输入自己的key</div>
              </div>
              <Input
                size="small"
                placeholder="请输入API-KEY"
                value={apiKey}
                className="w-[200px] h-[40px] round"
                onChange={value => {
                  // setModelId(value)
                  setApiKey(value.target.value)
                }}
              ></Input>
            </div>
            <div className="flex justify-between  mt-[16px] items-center border border-solid rounded-[8px] p-[16px] border-[#B5B5B5] h-[80px]">
              <div>
                <div className="text-[#000] font-bold	">对话记忆力</div>
                <div className="text-[#1A1A1A]">
                  更高的记忆力意味着 <span className="text-[#3162FF]">消耗更多的token</span>{' '}
                </div>
              </div>
              <Select
                placeholder="请选择记忆力"
                defaultValue={memory}
                className="w-[200px]"
                onChange={value => {
                  setMemory(value)
                }}
              >
                {memoryParams.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {/* <div className='flex justify-between  mt-[16px] items-center border border-solid rounded-[8px] p-[16px] border-[#B5B5B5] h-[80px]'>
            <div >
              <div className='text-[#000] font-bold	'>
                语音风格
              </div>
              <div className='text-[#1A1A1A]'>选择个性化语音播放风格 </div>
            </div>
            <Select placeholder="请选择风格" defaultValue={''} className='w-[150px]' onChange={value => {
              setCheckedVoice(value)
            }} >
              {voices.map((item: any, index) => (
              <Select.Option value={''} >
                标准
              </Select.Option>
              ))}
            </Select>
          </div> */}
            <div className="flex justify-end mt-[16px]">
              <Button
                className="mr-[8px]"
                onClick={() => {
                  setModelId(`` + chatSetting.apiModelName)
                  setMemory(chatSetting.memoryType)
                  changeSetting(false)
                }}
              >
                取消
              </Button>
              <Button onClick={saveSetting} type="primary">
                保存设置
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {codeOpen && (
        <Modal
          maskClosable={false}
          title="查看代码"
          open={codeOpen}
          onCancel={() => setCodeOpen(false)}
          footer={null}
          style={{ top: '20%', width: '734px' }}
        >
          <div className="flex justify-between">
            <Radio.Group
              value={checkCode}
              buttonStyle="solid"
              onChange={e => {
                setCheckCode(e.target.value)
              }}
            >
              <Radio.Button value="Python">Python</Radio.Button>
              <Radio.Button value="Javascript">Javascript</Radio.Button>
              <Radio.Button value="Curl">Curl</Radio.Button>
            </Radio.Group>
            <Button
              onClick={() => {
                copyValue(
                  getCode(checkCode, {
                    messages: [
                      {
                        role: 'system',
                        content: openFormValues?.prompt || 'You are a helpful assistant.'
                      },
                      {
                        role: 'user',
                        content: inputText
                      }
                    ],
                    model: chatModules?.find(item => item.apiModelName === chatModuleIds?.[0])?.api_modelName || 'gpt-3.5-turbo',

                    stream: true,
                    ...openFormValues
                  })
                )
                message.success('复制成功')
              }}
            >
              复制
            </Button>
          </div>

          <div className="bg-black mt-5">
            <Markdown
              content={`
\`\`\`
${getCode(checkCode, {
  messages: [
    {
      role: 'system',
      content: openFormValues?.prompt || 'You are a helpful assistant.'
    },
    {
      role: 'user',
      content: inputText
    }
  ],
  model: chatModules?.find(item => item.apiModelName === chatModuleIds?.[0])?.api_modelName || 'gpt-3.5-turbo',

  stream: true,
  ...openFormValues
})}
\`\`\`
`}
            ></Markdown>
          </div>
        </Modal>
      )}
    </div>
  )
}
