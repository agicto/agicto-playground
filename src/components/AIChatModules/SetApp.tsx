import React, { useState } from 'react'
import { Empty, Popover, Tag } from 'antd'
import { AppstoreOutlined, CheckOutlined, RedditOutlined } from '@ant-design/icons'
import { AppCellProps, DialogCellProps } from './AIChat.type'
import router from 'next/router'
import Image from 'next/image'
import peizhi from "@/images/chat/peizhi.png"
import weitu from "@/images/chat/weitu.png"

interface SetAppProps {
  appList?: AppCellProps[]
  currentApp: AppCellProps | void
  updateCurrentApp?: (appId?: string) => void
  currentDialog?: DialogCellProps
}

const SetAppContent: React.FC<SetAppProps> = (props) => {
  const { appList, currentApp, updateCurrentApp } = props
  return (
    <div className={'flex flex-col gap-y-2  flex-1 max-h-[50vh] overflow-auto max-w-[200px] cursor-pointer'}>
      {appList?.map(v => (
        <div className={'flex flex-row items-center min-w-0 gap-x-2 hover:bg-[#F5F5F7] py-2 px-2'} key={v.appId}
          title={v.name} onClick={() => {
            updateCurrentApp && updateCurrentApp(v.appId)
          }}>

          {v.icon ? <img src={v.icon} className="w-[14px] h-[14px]" /> : <RedditOutlined />}
          <div className={'flex-1 truncate'}>{v.name}</div>
          {currentApp?.appId === v.appId ? <CheckOutlined className={'text-[#00AFB0]'} /> :
            <div className={'w-[14px]'}></div>}
        </div>
      ))}
    </div>
  )
}


export const SetApp: React.FC<SetAppProps> = (props) => {
  const { appList, currentApp, updateCurrentApp, currentDialog } = props
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const recoverUpdateCurrentApp = (appId?: string) => {
    updateCurrentApp && updateCurrentApp(appId)
    setOpen(false)
  }
  const goExplore = () => router.push('/explore')
  const Title: React.FC<any> = () => {
    return (
      <div className={'flex justify-around'}>
        <div>选择应用模型</div>
        <div className={'font-normal cursor-pointer'} onClick={goExplore}>更多&gt;</div>
      </div>
    )
  }
  const CustomEmpty: React.FC<any> = () => {
    return (
      <div className={'w-[204px] h-[292px] flex justify-center items-center'}>
        <Empty description={'空空如也'} image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <span className={'px-[20px] py-[10px] bg-[#00AFB0]/10 rounded-lg text-[#00AFB0] cursor-pointer'}
            onClick={goExplore}>去添加</span>
        </Empty>
      </div>
    )
  }

  return (
    <>
      {currentApp ? (
        <div>
          <Tag bordered={false} closable className={'flex flex-1 flex-row justify-between py-2 mb-[10px] mr-0  bg-[rgba(49,98,255,0.08)]'}
            onClose={() => updateCurrentApp && updateCurrentApp()}>
            <>
              <span className='flex flex-row items-center min-w-0 gap-x-2 ' title={currentApp.name}>
                {/*  */}
                {/* <Image src={weitu} alt={''} className="w-[24px] h-[31px]" /> */}
                {currentApp.icon ? <img src={currentApp.icon} className="w-[20px] h-[20px]" /> : <RedditOutlined />}
                <span className='flex-1 truncate'>
                  <span className={`text-sm font-semibold leading-6 text-gray-900`}>{currentApp.name}</span>
                </span>
              </span>
            </>
          </Tag>
        </div>
      ) : null}
      {
        currentDialog ? (
          <Popover
            content={appList?.length ? <SetAppContent {...props} updateCurrentApp={recoverUpdateCurrentApp} /> :
              <CustomEmpty />}
            title={appList?.length ? <Title /> : null}
            trigger='click'
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div
              className={'w-full  cursor-pointer flex px-3 py-3 flex-row  bg-[rgba(49,98,255,0.08)]  items-center  rounded-lg'}>
              <>
                <Image src={peizhi} alt={''} className="h-[24px] w-[24px]" />
                <span className={'ml-[5px]'}>应用配置</span>
              </>
            </div>
          </Popover>
        ) : null
      }
    </>
  )
}

