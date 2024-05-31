import React from 'react'
import { ChattingAdapterProps } from './AIChat.type'
import { AIChatting } from './ChattingAdapterComponents'


export const ChattingAdapter: React.FC<ChattingAdapterProps> = (props) => {
  // const { siteConfig, currentDialog, onCreateDialog, currentApp } = props

  return (
    <div className=' h-[94%] flex flex-col  rounded bg-[#f0f0f0]/30'>
      <AIChatting {...props} />
    </div>
  )
}
