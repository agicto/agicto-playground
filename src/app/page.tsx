'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Layout, Select, Form, Input, message, Popconfirm, Space, FormInstance, Modal, Button } from 'antd'
import { ArrowLeftOutlined, CloseOutlined, SettingOutlined, SwapOutlined } from '@ant-design/icons'
import baseHooks from '../hooks/base'
import 'core-js/actual'
import styles from './page.module.scss'

import Image from 'next/image'
import {
  ChatAIHeader,
  ChatItem,
  ChattingAdapter,
  CreateChat,
  SetApp,
  useAIChatBaseManage,
  AIChatContext,
  MAIChatHeader,
  RecordCellProps
} from '@/components/AIChatModules'
import SetAIModules from '@/components/AIChatModules/SetAIModules'
import { AI_TYPE, AI_IMG_DATA } from '../consts/modelConst'
import { useRouter, useSearchParams } from 'next/navigation'
import Headers from '../components/Header'

const { Sider, Content, Header } = Layout
const { Option } = Select

import { IntegerStep } from '@/components/IntegerStep'
import { getUserkeyList } from '@/services/home'

const CACHE_DIALOG_ID_NAME = 'CACHE_DIALOG_ID'

interface AIChatProps {
  // siteConfig?: any
}

const AIChat: React.FC<AIChatProps> = props => {
  const [testModelList, setTestModelList] = useState<
    {
      modelId: string | number
      modelName: string
      messages: RecordCellProps[]
    }[]
  >([
    {
      modelId: 1,
      modelName: 'gpt-3.5-turbo',
      messages: []
    }
  ])
  const [editIndex, setEditIndex] = useState(-1)
  const [modelConfigOpen, setModelConfigOpen] = useState(false)
  const [row, setRow] = useState<any>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const formRef = React.useRef<FormInstance>(null)




  const [moreOpen, setMoreOpen] = useState(false)
  const searchParams = useSearchParams()
  const fromRef = useRef<any>(null)
  const [form] = Form.useForm()
  const { initUserInfo } = baseHooks()
  const modelId = searchParams.get('model') || 'gpt-3.5-turbo'
  const modelType = searchParams.get('modelType') || 'message'
  const [aiType, setAiType] = useState<'message' | 'image' | string>(modelType)

  const siderStyle: React.CSSProperties = {
    color: '#333333',
    padding: '0px 16px',
    borderRight: '1px solid #E8E8E8',
    height: '100%',
    background: '#F2F8FF',
    border: 'none'
  }
  const {
    chatState,
    currentDialog,
    currentApp,
    qiNiuToken,
    contextHolder,
    isPC,
    getDialogList,
    mergeUpdateChatState,
    getApp,
    onCreateDialog,
    updateCurrentApp,
    chatItemAction,
    getModules,
    openFormValues,
    setOpenFormValues,
    openImgFormValues,
    setOpenImgFormValues,
  }:any = useAIChatBaseManage(modelId)

  const router = useRouter()

  const initData = () => {
    getModules({ typeId: AI_TYPE[modelType] }, 'init')
    initUserInfo()
  }

  useEffect(() => {
    initData()
    getUserkeyList({}).then(res => {
      try {
        console.log(res)
        if (res.data.recordList[0].openKey && !localStorage.getItem('open-key'))
          localStorage.setItem('open-key', res.data.recordList[0].openKey)
      } catch (err: any) {
        console.log(err)
      }
    })
    if (aiType === 'message') {
      setOpenFormValues({
        max_tokens: 256,
        frequency_penalty: 0,
        presence_penalty: 0,
        temperature: 1,
        top_p: 1,
        prompt: 'You are a helpful assistant.'
      })
      setOpenImgFormValues({
        n: 4,
        size: '256x256'
      })
    }
  }, [])

  useEffect(() => {
    if (aiType === 'image') {
      form.setFieldsValue({
        n: AI_IMG_DATA[chatState?.chatModuleIds[0]]?.n,
        size: AI_IMG_DATA[chatState?.chatModuleIds[0]]?.size[0]?.value
      })
      setOpenImgFormValues({
        n: AI_IMG_DATA[chatState?.chatModuleIds[0]]?.n,
        size: AI_IMG_DATA[chatState?.chatModuleIds[0]]?.size[0]?.value
      })
    }
  }, [chatState])

  const changeType = (type: any) => {
    getModules({ typeId: AI_TYPE[type] }, '')
    setAiType(type)
  }

  // const CustomerEmpty: React.FC<any> = () => {
  //   return <>customerEmpty</>
  // }
  const CustomerSider = () => {
    return (
      <Layout className={'h-[100%] w-full p-2 bg-[#fff]'}>
        <div className={'pb-[10px] text-[#333333] bg-[#fff]'}>
          <div className={'text-[20px] font-bold  pb-[10px]'}>AI助理</div>
          <CreateChat onClick={onCreateDialog} />
        </div>
        <Content className={'overflow-auto bg-[#ffffff]'}>212</Content>
      </Layout>
    )
  }

  const { siteConfig } = {} as any
  return (
    <>
      {contextHolder}
      <Layout className={'h-[calc(100vh_-_10px)] relative  '}>
        <Layout
          className={isPC ? 'py-[15px] px-[15px] bg-[#F2F8FF] h-[100%] ' : 'bg-[#F2F8FF]'}
          style={{ background: '#F2F8FF', height: '100% ' }}
        >
          {isPC ? (
            <Sider style={siderStyle} theme={'light'} width={280} className={'border-none'}>
              <div className={'flex min-h-[64px] pt-[16px] pb-[20px] px-[8px] text-base'}>

                <div className={''}>AGICTO-调试平台</div>
              </div>
              <Layout className={'h-[100%] bg-[#F2F8FF]'} style={{ background: '#F2F8FF' }}>
                <div className={'mb-[14px] p-2 text-[#333333] bg-white border-round rounded'}>
                  <div className="mb-1">选择类型</div>
                  <div>
                    <Select
                      style={{ width: 160 }}
                      defaultValue={aiType}
                      onChange={changeType}
                      options={[
                        {
                          label: '聊天',
                          value: 'message'
                        },
                        {
                          label: '图片',
                          value: 'image'
                        }
                      ]}
                    ></Select>
                  </div>
                </div>
                <Content className={'overflow-auto bg-[#ffffff] p-2'}>
                  <Form
                    layout={'vertical'}
                    form={form}
                    initialValues={{
                      max_tokens: 256,
                      frequency_penalty: 0,
                      presence_penalty: 0,
                      temperature: 1,
                      top_p: 1,
                      prompt: 'You are a helpful assistant.',
                      n: 4,
                      size: '256x256'
                    }}
                    onValuesChange={(_, values: any) => {
                      const newData: any = {}
                      Object.keys(values).forEach(item => {
                        if (values[item]) {
                          newData[item] = values[item]
                        }
                      })
                      if (aiType === 'message') {
                        setOpenFormValues(newData)
                      } else {
                        setOpenImgFormValues(newData)
                      }
                    }}
                  >
                    {aiType === 'image' && (
                      <>
                        <div className="mb-1"> <div className={''}>AGICTO-调试平台</div></div>
                        <div className="mb-4">
                          {!siteConfig?.showModel && (
                            <div>
                              <SetAIModules
                                {...{ modelId }}
                                chatModules={chatState.chatModules}
                                chatModuleIds={chatState.chatModuleIds}
                                mergeUpdateChatState={mergeUpdateChatState}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      {aiType === 'message' ? (
                        <>
                          <div className="mb-1">提示词设置</div>
                          <div className="mb-0">
                            <Form.Item name="prompt" className="mb-1">
                              <Input.TextArea rows={5} placeholder="设置prompt提示词"></Input.TextArea>
                            </Form.Item>
                          </div>
                          <div className="mb-1">参数设置</div>
                          <Form.Item name="max_tokens" label="output length">
                            <IntegerStep max={4096} step={1} />
                          </Form.Item>

                          <Form.Item name="temperature" label="Temperature">
                            <IntegerStep max={2} />
                          </Form.Item>
                          <Form.Item name="top_p" label="Top-P">
                            <IntegerStep max={1} />
                          </Form.Item>
                          <Form.Item name="presence_penalty" label="Precence Penalty">
                            <IntegerStep max={2} />
                          </Form.Item>
                          <Form.Item name="frequency_penalty" label="Frequency Penalty">
                            <IntegerStep max={2} />
                          </Form.Item>
                        </>
                      ) : (
                        <>
                          <div className="mb-1">参数设置</div>
                          <Form.Item name="n" label="数量">
                            <IntegerStep disabled={AI_IMG_DATA[chatState?.chatModuleIds[0]]?.disabled} max={10} step={1} />
                          </Form.Item>
                          <Form.Item name="size" label="尺寸">
                            <Select
                              defaultValue={AI_IMG_DATA[chatState?.chatModuleIds[0]]?.size?.value}
                              options={AI_IMG_DATA[chatState?.chatModuleIds[0]]?.size}
                            ></Select>
                          </Form.Item>
                        </>
                      )}
                    </div>
                  </Form>
                </Content>
              </Layout>
            </Sider>
          ) : null}

          <Content>
            {isPC ? (
              aiType === 'message' ? (
                <div className="flex justify-between items-center pb-2">
                  <div className={styles.modelList}>
                    {testModelList.map((item, index) => {
                      return (
                        <div className={styles.modelCard} key={item.modelName}>
                          {item.modelName}
                          <Space
                            split={
                              <span
                                style={{
                                  color: '#eaedf1'
                                }}
                              >
                                {' '}
                                |{' '}
                              </span>
                            }
                            style={{
                              marginLeft: 12,
                              cursor: 'pointer'
                            }}
                          >
                            <SwapOutlined
                              onClick={() => {
                                setEditIndex(index)
                                setModelConfigOpen(true)
                              }}
                            />
                            <Popconfirm
                              title={'确认删除模型?'}
                              onConfirm={() => {
                                const newList = [...testModelList]
                                newList.splice(index, 1)
                                setTestModelList(newList)
                              }}
                            >
                              <CloseOutlined />
                            </Popconfirm>
                          </Space>
                        </div>
                      )
                    })}
                  </div>
                  <Button
                    disabled={testModelList.length === 3}
                    className="primaryBtn"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      setModelConfigOpen(true)
                    }}
                  >
                    添加模型
                  </Button>
                </div>
              ) : (
                <ChatAIHeader
                  currentDialog={currentDialog}
                  chatModules={chatState.chatModules}
                  chatModuleIds={chatState.chatModuleIds}
                  mergeUpdateChatState={mergeUpdateChatState}
                />
              )
            ) : (
              <MAIChatHeader
                currentDialog={currentDialog}
                chatModules={chatState.chatModules}
                chatModuleIds={chatState.chatModuleIds}
                mergeUpdateChatState={mergeUpdateChatState}
                Sider={CustomerSider}
              />
            )}
            <AIChatContext.Provider value={{ qiNiuToken, mergeUpdateChatState, isPC }}>
              <ChattingAdapter
                // @ts-ignore
                siteConfig={props.siteConfig}
                currentDialog={currentDialog}
                currentApp={currentApp}
                chatModuleIds={chatState.chatModuleIds}
                onCreateDialog={onCreateDialog}
                chatModules={chatState.chatModules}
                mergeUpdateChatState={mergeUpdateChatState}
                openFormValues={openFormValues}
                openImgFormValues={openImgFormValues}
                aiType={aiType}
                testModelList={testModelList}
                setTestModelList={setTestModelList}
              />
            </AIChatContext.Provider>
            <Modal
              className={styles.modal}
              title={editIndex === -1 ? '添加模型' : '切换模型'}
              open={modelConfigOpen}
              destroyOnClose
              onCancel={() => {
                setModelConfigOpen(false)
                setEditIndex(-1)
              }}
              onOk={async () => {
                await formRef.current?.validateFields()
                const obj: any = {
                  modelName: formRef.current?.getFieldValue('model_name') || '',
                  messages: [] as any,
                  modelId:
                    chatState.chatModules?.find((item: any) => item.modelName === formRef.current?.getFieldValue('model_name'))
                      ?.apiModelName || ''
                }
                if (editIndex === -1) {
                  setTestModelList([
                    ...testModelList,
                    {
                      ...obj
                    }
                  ])
                } else {
                  const newList = [...testModelList]
                  newList.splice(editIndex, 1, obj)
                  setTestModelList(newList)
                }
                setModelConfigOpen(false)
                setEditIndex(-1)
              }}
              // footer={null}
            >
              <Form
                ref={formRef}
                layout="vertical"
                initialValues={{
                  // provider: 'azure',
                  // model_name: 'gpt-3.5-turbo',
                  enable_summarize: false
                }}
                style={{ marginTop: 30 }}
              >
                <Form.Item label="模型" name={'model_name'} rules={[{ required: true }]}>
                  <Select
                    // @ts-ignore
                    options={chatState.chatModules
                      .filter((item: any) => !testModelList.find(model => model.modelName === item.modelName))
                      .map((item: any) => ({ value: item.modelName, label: item.modelName }))}
                  />
                </Form.Item>
                {/* <Form.Item name={'enable_summarize'} valuePropName="checked" label="开启摘要回答">
              <Switch />
            </Form.Item> */}
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AIChat
