import React from 'react'
import { ChatModuleCell, ChatStateProps, DialogCellProps } from './AIChat.type'
interface ChatAIHeaderProps {
  currentDialog?: DialogCellProps
  chatModules?: ChatModuleCell[]
  chatModuleIds?: string[]
  isShowModules?: boolean
  mergeUpdateChatState: (state: ChatStateProps) => void
}




export const ChatAIHeader: React.FC<ChatAIHeaderProps> = (props) => {
  const { currentDialog, chatModules, chatModuleIds, isShowModules } = props
  const activeModulesLabels = React.useMemo<any>(() => {
    const mapping: any = {}
    const modules = chatModules || []
    modules.forEach(v => {
      mapping[v.apiModelName] = { modelName: v.modelName, icon: v.icon }
    })
    const ids = chatModuleIds || []
    const labels = ids.map(id => {
      return mapping[id] || ''
    }).filter(Boolean)
    return labels?.[0]
  }, [chatModules, chatModuleIds, currentDialog])

  return (
    <div className={'flex min-h-[50px] pb-[13px] items-center px-[20px] divide-y justify-between rounded-[10px_10px_0_0]'}>
      <div className='flex'>
        <div className='w-[48px] h-[48px] rounded-full bg-[rgba(201,224,255,0.4)] flex items-center justify-center mr-3'>
          <img src={activeModulesLabels?.icon} className="w-[25px]" alt={''} />
        </div>
        <div>
          <div className={'h-[30px] font-bold text-[18px] max-w-[300px] truncate'} title={currentDialog?.name}>{currentDialog?.name || 'AI助理'}</div>
          <div>
            <span className={' text-[14px] text-[#999999] '}>
              当前使用:
              <>{activeModulesLabels?.modelName}</>
            </span>
          </div>
        </div>
      </div>
      <div className={''}>
        {/* <Button icon={<i className='xijing xijingreply'></i>}>分享精彩</Button> */}
      </div>
    </div>
  )
}
