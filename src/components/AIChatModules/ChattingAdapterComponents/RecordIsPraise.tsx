// @ts-nocheck
import React, { useState } from 'react'
import { RecordCellProps } from '@/components/AIChatModules'
import { setLabelRecord } from '@/services/chat'
import { LikeOutlined } from '@ant-design/icons'

/**
 * @description 局部更新是否喜欢
 * */
export const RecordIsPraise = (props) => {
  const {
    item, config = {
      isOnlyChat: 1,
      isDebug: 0
    }
  } = props
  const [isLike, setIsLike] = useState(!!item?.isPraise)
  const setIsPraise = async (recordItem: RecordCellProps) => {
    try {
      const isPraise = !recordItem?.isPraise
      const res = await setLabelRecord({
        type: isPraise ? 1 : 2,
        id: recordItem.id,
        ...config
      })
      console.log(res)
      if (res.code === 0) {
        setIsLike(isPraise)
      }
    } catch (e) {
      console.error('RecordIsLike', e)
    }
  }
  return (
    <LikeOutlined className={`ml-[10px] cursor-pointer ${isLike && 'text-[red]'}`}
                  onClick={() => setIsPraise(item)} />
  )
}
