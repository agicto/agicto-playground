import React, { useEffect, useMemo } from 'react'
import { Input, Popconfirm } from 'antd'
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DialogCellProps } from './AIChat.type'
import { setTopDialog } from '@/services/chat'

interface ChatItemProps {
  item: DialogCellProps
  currentDialog?: DialogCellProps
  action?: any
  getDialogList?: any
}

const notCurrentStyle = 'text-gray-900'
const isCurrentStyle = 'bg-[rgba(49,98,255,0.08)]'


export const ChatItem: React.FC<ChatItemProps> = (props) => {
  const { action, currentDialog, item, getDialogList } = props
  const [mouseOver, setMouseOver] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [rename, setRename] = React.useState('')
  const isCurrent = useMemo<boolean>(() => {
    return item.dialogId === currentDialog?.dialogId
  }, [currentDialog, item])

  const onMouseOut = () => {
    setMouseOver(false)
  }
  const onMouseOver = () => {
    setMouseOver(true)
  }
  // @ts-ignore
  const onEdit = e => {
    e.stopPropagation()
    e.preventDefault()
    action &&
      action({
        action: 'select',
        dialogId: item.dialogId
      })
    setIsEdit(true)
  }
  // @ts-ignore
  const onDel = e => {
    e.stopPropagation()
    e.preventDefault()
    action &&
      action({
        action: 'del',
        dialogId: item.dialogId
      })
  }
  // @ts-ignore
  const onSave = e => {
    e.stopPropagation()
    e.preventDefault()
    if (rename) {
      action &&
        action({
          action: 'rename',
          dialogId: item.dialogId,
          rename,
          item
        })
    }
    setIsEdit(false)
    setRename('')
  }

  // @ts-ignore
  const chooseItem = e => {
    e.stopPropagation()
    speechSynthesis.cancel()
    action &&
      action({
        action: 'select',
        dialogId: item.dialogId
      })
  }

  // @ts-ignore
  const Topping = async item => {
    await setTopDialog({
      dialogId: item.dialogId,
      top: item?.top == 1 ? 0 : 1
    })
    getDialogList()
  }
  useEffect(() => {
    if (!isCurrent) {
      setIsEdit(false)
    }
  }, [isCurrent])
  return (
    <div
      className={`gap-x-[5px] h-[40px] w-full hover:bg-[rgba(49,98,255,0.08)] cursor-pointer flex flex-1 flex-row mb-[5px]  items-center px-2  rounded-lg  ${
        isCurrent || mouseOver ? isCurrentStyle : notCurrentStyle
      }  ${isCurrent || mouseOver ? 'text-[#3162FF]' : ''}`}
      title={item?.name}
      onClick={chooseItem}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      {!isEdit ? (
        <>
          <span>
            <i className="xijingchat xijing" />
          </span>
          <span className={'truncate flex-1'}>{item?.name}</span>
        </>
      ) : null}
      {isEdit && isCurrent ? (
        <>
          <Input value={rename} size={'small'} onChange={e => setRename(e.target.value)} />
          <span onClick={() => setIsEdit(false)}>
            <CloseOutlined className={'text-[#333] hover:text-[#3162FF]'} />
          </span>
          <span onClick={onSave}>
            <CheckOutlined className={'text-[#333] hover:text-[#3162FF]'} />
          </span>
        </>
      ) : null}
      {isCurrent && !isEdit ? (
        <span>
          <span
            className={item?.top == 0 ? 'mr-[8px] text-[#333]' : 'text-[#3162FF] mr-[8px] bg-[rgba(49,98,255,0.15)]'}
            onClick={() => {
              Topping(item)
            }}
          >
            <i className="xijing xijingding-xianxing font-bold  hover:text-[#3162FF]" />
          </span>
          <span
            className={'mr-[8px] text-[#333] hover:text-[#3162FF]'}
            onClick={e => {
              setRename(item?.name || '')
              onEdit(e)
            }}
          >
            <EditOutlined />
          </span>
          <span className="text-[#333] hover:text-[#3162FF]">
            <Popconfirm title="温馨提示" description="删除后无法恢复，是否继续删除?" onConfirm={onDel} okText="确定" cancelText="取消">
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </span>
      ) : null}
      {mouseOver && !isCurrent ? (
        <span>
          <span
            className={item?.top == 0 ? 'mr-[8px] text-[#333]' : 'text-[#3162FF] mr-[8px] bg-[rgba(49,98,255,0.15)]'}
            onClick={() => {
              Topping(item)
            }}
          >
            <i className="xijing xijingding-xianxing font-bold  hover:text-[#3162FF]" />
          </span>
          <span
            className={'mr-[8px] text-[#333] hover:text-[#3162FF]'}
            onClick={e => {
              setRename(item?.name || '')
              onEdit(e)
            }}
          >
            <EditOutlined />
          </span>
          <span className="text-[#333] hover:text-[#3162FF]">
            <Popconfirm title="温馨提示" description="删除后无法恢复，是否继续删除?" onConfirm={onDel} okText="确定" cancelText="取消">
              <DeleteOutlined
                onClick={e => {
                  e.stopPropagation()
                }}
              />
            </Popconfirm>
          </span>
        </span>
      ) : null}
    </div>
  )
}

