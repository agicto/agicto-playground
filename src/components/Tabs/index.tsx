import React, { useMemo } from 'react'
import {Select} from 'antd'
// @ts-ignore
interface Props  {
  list: { id: string; label: string }[]
  activeId: string
  size?: 'sm' | 'md' | 'lg'
  onChange: (id: string) => void
}

export const Tabs = ({ list, size = 'md', activeId, onChange, ...props }: Props) => {


  return (
    <Select value={activeId} onChange={(e) => {
      onChange(e)
    }} options={list.map((item) => {
      return {
        value: item.id,
        label: item.label
      }
    })}></Select>
  
  )
}


