import React, { useState } from 'react'
import { Popup } from 'antd-mobile'
import { Popover } from 'antd'
import { UnorderedListOutline, MoreOutline } from 'antd-mobile-icons'
import { ChatModuleCell, ChatStateProps, DialogCellProps } from '../AIChat.type'
import { CheckOutlined, RedditOutlined, BarsOutlined } from '@ant-design/icons'
import { AI_MAPPING } from '@/components/AIChatModules/ChattingAdapterComponents'

interface ChatAIHeaderProps {
  currentDialog?: DialogCellProps
  chatModules?: ChatModuleCell[]
  chatModuleIds?: string[]
  Sider?: any
  mergeUpdateChatState: (state: ChatStateProps) => void
}

const SetAIModulesContent: React.FC<ChatAIHeaderProps> = (props) => {
  const { chatModuleIds, chatModules, mergeUpdateChatState } = props
  const getIsActive = (item: ChatModuleCell): boolean => {
    return !!(chatModuleIds?.some(v => v === item.apiModelName))
  }
  const activeModule = (item: ChatModuleCell) => {
    mergeUpdateChatState({
      chatModuleIds: [item.apiModelName]
    })
  }
  const getSVG = (item: ChatModuleCell) => {
    // @ts-ignore
    const svg = AI_MAPPING[item.apiModelName]
    return svg || <RedditOutlined />
  }
  return (
    <div className={'flex flex-col gap-y-2  flex-1 max-h-[50vh] overflow-auto max-w-[200px] cursor-pointer'}>
      {chatModules?.map(v => (
        <div
          className={'flex flex-row items-center min-w-0 gap-x-2 hover:bg-[#F5F5F7] py-2 px-2'}
          key={v.apiModelName}
          title={v.modelName}
          onClick={() => {
            activeModule(v)
          }}
        >
          {getSVG(v)}
          <div className={'flex-1 flex-1 truncate'}>{v.modelName}</div>
          {getIsActive(v) ? <CheckOutlined className={'text-[#00AFB0]'} /> : <div className={'w-[14px]'} />}
        </div>
      ))}
    </div>
  )
}


export const MAIChatHeader: React.FC<ChatAIHeaderProps> = (props) => {
  const { currentDialog, chatModules, chatModuleIds } = props
  const [open, setOpen] = useState(false)
  const [openSider, setOpenSider] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const activeModulesLabels = React.useMemo<string>(() => {
    const mapping: any = {}
    const modules = chatModules || []
    modules.forEach(v => {
    
      mapping[v.apiModelName] = v.modelName
    })
    const ids = chatModuleIds || []
    const labels = ids.map(id => {
      return mapping[id] || ''
    }).filter(Boolean)
    return labels.join(',')
  }, [chatModules, chatModuleIds, currentDialog])
  const consumes = React.useMemo<string>(() => {
    const mapping: any = {}
    const modules = chatModules || []
    modules.forEach(v => {
      mapping[v.apiModelName] = v.consume ? `${v.consume}` : ''
    })
    const ids = chatModuleIds || []
    const labels = ids.map(id => {
      return mapping[id] || ''
    }).filter(Boolean)
    return labels.join(',')
  }, [chatModules, chatModuleIds, currentDialog])
  return (
    <>
      <div className={'flex min-h-[64px] bg-[#ffffff] items-center px-[20px] divide-y border-b-1 justify-between'}>
        <div className={'flex items-center'}>
          <UnorderedListOutline className={'cursor-pointer text-3xl'} onClick={() => setOpenSider(true)} />
          <div className={'ml-[10px]'}>
            <div className={'h-[30px] font-bold text-[18px] max-w-[95%] truncate'}
              title={currentDialog?.name}>{currentDialog?.name || 'AI助理'}</div>
            <div>
              <span className={' text-[12px] text-[#999999]'}>模型:<span className={'font-bold'}>{activeModulesLabels}</span></span>
              {consumes ? <span className={'ml-[10px] '}>消耗{consumes}水滴</span> : null}
            </div>
          </div>
        </div>
        {/* <div className={''}>
          <Popover
            content={<SetAIModulesContent {...props} />}
            title={'选择交流模型'}
            trigger='hover'
            open={open}
            onOpenChange={handleOpenChange}
          >
            <MoreOutline className={'text-3xl'} />
          </Popover>
        </div> */}
      </div>
      <Popup
        visible={openSider}
        onMaskClick={() => {
          setOpenSider(false)
        }}
        position='left'
        bodyStyle={{ width: '60vw' }}
      >
        {props.Sider()}
      </Popup>
    </>
  )
}
