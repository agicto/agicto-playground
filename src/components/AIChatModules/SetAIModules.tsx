// @ts-nocheck
import { Popover, Radio } from "antd"
import { ChatModuleCell } from './AIChat.type'
import { AI_MAPPING } from './ChattingAdapterComponents'
import { DownOutlined, RedditOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from "react"


const SetAIModulesContent: any = (props) => {
  const { chatModules, mergeUpdateChatState, chatModuleIds, getSVG } = props
  return (
    <div className={'flex flex-col gap-y-2  flex-1 max-h-[50vh] overflow-auto max-w-[200px] cursor-pointer'}>
      <Radio.Group
        value={chatModuleIds?.[0]}
        onChange={item => {
          mergeUpdateChatState({
            chatModuleIds: [item.target.value]
          })
        }}
      >
        {chatModules?.map(v => (
          <div key={v.apiModelName} className="py-1">
            <Radio value={v.apiModelName}>
              <div className="flex items-center">
                {getSVG(v)}
                <span className="ml-2"> {v.modelName}</span>
              </div>
            </Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  )
}


const SetAIModules = (props) => {
  const { chatModuleIds, chatModules } = props
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const getSVG = (item: ChatModuleCell) => {
    const svg = AI_MAPPING[item.apiModelName]
    return item.icon ? <img className='w-[16px] ' src={item.icon} /> : svg || <RedditOutlined />
  }

  const getIsActive = (item: ChatModuleCell): boolean => {
    return !!chatModuleIds?.some(v => v === item.apiModelName)
  }
  
  return <>
    <Popover
      content={<SetAIModulesContent {...props} getSVG={getSVG} getIsActive={getIsActive} />}
      title={null}
      trigger='hover'
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="min-w-[150px] h-[40px] rounded-[4px] box-border border border-solid border-gray-200  hover:border-[#3162FF] flex items-center justify-between px-3">
        <div className="flex-1">
          {
            chatModules?.map((v, index) => {
              return getIsActive(v) ? (
                <div key={index} className="flex w-full items-center">
                  {getSVG(v)}
                  <div className="ml-3 whitespace-nowrap">{v.modelName}</div>
                </div>
              ) : null
            })
          }
        </div>
        {open ? <UpOutlined /> : <DownOutlined />}
      </div>
    </Popover>
  </>
}

export default SetAIModules