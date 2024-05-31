import { LoadingOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import React from 'react'
import { RecordCellProps } from '../AIChat.type'
import baseHooks from '../../../hooks/base'
import Logo from '/public/logo.jpeg'
import { getLocalStorage } from '../../../utils/localStorage'
export const AI_MAPPING = {
  1: (
    <img src='https://a.ew6.cn/webicon/model/gpt.png' className='w-[16px]' />
  ),
  2: (
    <img src='https://a.ew6.cn/webicon/model/gpt.png' className='w-[16px]' />
  ),
  3: (
    <img src='https://a.ew6.cn/webicon/model/360.png' className='w-[16px]' />
  ),
  4: (
    <img src='https://a.ew6.cn/webicon/model/wenxin.png' className='w-[16px]' />
  ),
  5: (
    <img src='https://a.ew6.cn/webicon/model/xinghuo.png' className='w-[16px]' />
  ),
  6: (
    <img src='https://a.ew6.cn/webicon/model/gpt.png' className='w-[16px]' />
  ),
  7: (
    <img src='https://a.ew6.cn/webicon/model/gpt.png' className='w-[16px]' />
  ),
  8: (
    <img src='https://a.ew6.cn/webicon/model/baichuan.png' className='w-[16px]' />
  ),
  10: (
    <img src='https://a.ew6.cn/webicon/model/hunyuan.png' className='w-[16px]' />
  )
}

interface ChatImgProps {
  siteConfig: any
  generateLoading: boolean
  recordItem: RecordCellProps
}

export const ChatImg: React.FC<ChatImgProps> = (props) => {
  const { siteConfig, generateLoading, recordItem } = props
  const getHeaderImage = () => {
    // @ts-ignore
    const headerImage = AI_MAPPING[`${recordItem?.apiModelName}`]
    if (headerImage) {
      return headerImage
    }
    return (
      <img
        src={siteConfig?.icon || 'https://ew6.cn/logo.png'}
        alt='西鲸'
        width={20}
        height={20}
        style={{
          width: 'auto',
          height: '20px'

        }}
      />
    )
  }
  return (
    <>
      {generateLoading ? <LoadingOutlined className={'text-[#00AFB0]'} /> : getHeaderImage()}
    </>
  )
}
export const DefaultUserImage = () => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#CB8767'
    className='w-10 h-10'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </svg>)
export const UserImg = () => {
  const userInfo: any = JSON.parse(getLocalStorage('userInfo') || '{}')
  return (
    <Image
      width={35}
      height={35}
      className={'rounded-full flex-none w-[35px]'}
      style={{ width: '35px' }}
      preview={false}
      src={userInfo?.headimg_url || 'https://ew6.cn/agictoImg/%E7%B3%BB%E7%BB%9F%E5%A4%B4%E5%83%8F%E5%A4%87%E4%BB%BD%20%281%29.png'}
      // placeholder={
      //   <DefaultUserImage />
      // }
    />
  )
}


