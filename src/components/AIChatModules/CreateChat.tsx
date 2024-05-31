import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
// hover:bg-[#333] hover:text-[white] justify-center
export const CreateChat: React.FC<any> = (props) => {
  return (
    <Button
      onClick={() => {
        props.onClick && props.onClick()
      }}
      disabled={props?.disabled || false}
      className='relative w-full h-[40px]  cursor-pointer inline-flex items-center  p-0.5 pl-2 overflow-hidden text-m font-medium rounded-lg group bg-white border  border-solid border-[rgba(49,98,255,0.25)] from-green-400 to-blue-600  justify-center text-[#3162FF] '
    >
      <PlusOutlined style={{ width: 20, fontWeight: 700 }} />
      <>创建新会话</>
    </Button>
  )
}

