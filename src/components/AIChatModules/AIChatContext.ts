import { createContext } from 'react'
import { ChatStateProps } from './AIChat.type'

interface AIChatContextProps {
  qiNiuToken: string
  mergeUpdateChatState?: (params: ChatStateProps) => void
  isPC?: boolean
}

export const AIChatContext = createContext<AIChatContextProps>({ qiNiuToken: '' })
