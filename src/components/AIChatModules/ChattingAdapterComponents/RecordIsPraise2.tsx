// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { RecordCellProps } from '@/components/AIChatModules'
import { setLabelRecord } from '@/services/chat'
import { LikeOutlined } from '@ant-design/icons'
import Image from 'next/image'
import zan from "@/images/chat/zan.png"
import zan1 from "@/images/chat/zan1.png"
import low from "@/images/chat/low.png"
import low1 from "@/images/chat/low1.png"

/**
 * @description 局部更新是否喜欢
 * */
export const RecordIsPraise = (props) => {
  const {
    item, config = {
      isOnlyChat: 1,
      isDebug: 0,
    }
  } = props
  const [isLike, setIsLike] = useState<any>(0)
  useEffect(() => {
    if (item?.isPraise) {
      setIsLike(1)
    }
    if (item?.isTread) {
      setIsLike(2)
    }
  }, [])
  const setIsPraise = async (recordItem: RecordCellProps, type) => {
    try {
      const res = await setLabelRecord({
        type,
        id: recordItem.id,
        sceneType: props.sceneType,
        ...config
      })
      console.log(res)
      if (res.code === 0) {
        setIsLike(type == isLike ? 0 : type)
      }
    } catch (e) {
      console.error('RecordIsLike', e)
    }
  }
  return (
    <>
      {/* <div className='w-[32px] h-[32px] bg-white rounded mx-3 text-center leading-[32px] cursor-pointer' onClick={() => setIsPraise(item, 1)}>
        <Image src={isLike == 1 ? zan : zan1} alt={''} width={32} height={32} />
      </div>
      <div className='w-[32px] h-[32px] bg-white rounded text-center leading-[32px] cursor-pointer' onClick={() => setIsPraise(item, 2)}>
        <Image src={isLike == 2 ? low : low1} alt={''} width={32} height={32} />
      </div> */}
    </>
  )
}
