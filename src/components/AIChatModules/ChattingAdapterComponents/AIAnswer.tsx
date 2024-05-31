// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChatImg } from '@/components/AIChatModules/ChattingAdapterComponents/HeaderImage'
import { Markdown } from '@/components/Markdown'
import { CopyOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { message } from 'antd'
import { RecordIsPraise } from './RecordIsPraise2'
import { isPc } from '@/utils'
import { IconPlay } from '@/icons/IconPlay'
import { IconPause } from '@/icons/Pause'

let contentArr = []
let utterance
export const AIAnswer = (props) => {
  const { siteConfig, generateLoading, record, index, item, onResend, onSubmit, sceneType, autoPlay, setCurrentAnswerId, currentId, voices, checkedVoice } = props
  const [playState, setPlayState] = useState<any>(null)
  const [canPlayState, setCanPlayState] = useState<any>(false)
  let num = 0


  const speech = (text, auto, id) => {
    speechSynthesis.cancel()
    num++
    setTimeout(() => {
      utterance = new SpeechSynthesisUtterance(text)

      // setUtterance(utterance);
      // voice：选择不同的语音。
      // pitch：调整语音的音高。
      // rate：调整语音的速度。
      // volume：调整语音的音量。
      // text：设置要朗读的文本内容。
      // lang：设置使用的语言和口音。

      // 设置属性
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      const voice = voices.find(v => v.name === checkedVoice)
      utterance.voice = voice
      // 设置事件监听器以了解TTS过程中发生的事情
      utterance.onstart = function (event) {
        console.log('Speech started');
      };

      utterance.onend = function (event) {
        if (!auto) {
          setPlayState(false)
          speechSynthesis.cancel()
          return
        }
        auto && play(contentArr[num], true, id)

      };

      utterance.onerror = function (event) {
        console.error('Speech error:', event.error);
      };

      // 开始朗读
      speechSynthesis.speak(utterance);
    }, 100)

  }

  const play = (text, auto = true, id) => {
    setPlayState(true)
    setCurrentAnswerId(id)
    if (!text) {
      setPlayState(false)
      speechSynthesis.cancel()
      return
    }
    if (speechSynthesis.paused && currentId === id && !auto) {
      const voice = voices.find(v => v.name === checkedVoice)
      voice && utterance && (utterance.voice = voice)
      speechSynthesis.resume()
      return
    }
    else {
      speech(text, auto, id)
    }


  }

  useEffect(() => {
    if (item.content.length >= 20 && autoPlay && generateLoading) {
      setCanPlayState(true)
      for (let i = 0; i < item.content.length; i += 20) {
        contentArr = item.content.split(/[，。；、]/)
      }
    }
  }, [item.content])

  useEffect(() => {
    speechSynthesis.cancel()
    setTimeout(() => {
      canPlayState && play(contentArr[0], true, currentId)
    })
  }, [canPlayState])

  const pause = () => {
    setPlayState(false)
    speechSynthesis.pause()
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      <div className={`flex  py-[20px]  bg-[#F2F8FF] rounded-md ${isPc() ? 'px-[24px]' : 'px-[15px]'}`}>
        <div
          className='flex w-[35px] h-[35px] rounded-full p-1 items-center border justify-center border-solid border-[#E8E8E8] flex-none'>
          <ChatImg siteConfig={siteConfig}
            generateLoading={generateLoading && index === record?.length - 1} recordItem={item} />
        </div>
        <div className={`ml-2 relative w-full min-h-[34px]  pb-[10px] pr-[0]`}>
          <Markdown content={item.content || ''} />
          {item?.canResend && (
            <span
              onClick={onResend}
              className='absolute right-[25px] top-[100%] w-[25px] h-[25px] flex items-center text-gray-400 hover:text-gray-800  justify-center cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                />
              </svg>
            </span>
          )}
          <div className='flex justify-between items-center mt-[20px]'>
            <div>
              {item.content && !generateLoading ? (
                <div className={'flex flex-row'}>
                  <div
                    className='rounded w-[110px] h-[32px] bg-white flex items-center text-gray-600 hover:text-gray-800  justify-center cursor-pointer mr-3'
                    onClick={async () => {
               
                      let userProblem;
                      record.map((i) => {
                        if (i.id == item.id) {
                          userProblem = record[index - 1]
                        }
                          
                      })
                      await onSubmit({
                        type: "isRepeat",
                        data: {
                          imgList: userProblem?.imgList,
                          message: userProblem?.content,
                        },
                      })
                    }}
                  >
                    <RedoOutlined />
                    <span className='ml-2'>重新回答</span>
                  </div>
                  <span
                    onClick={() => {
                      copy(item.content || '')
                      message.success('复制成功')
                    }}
                    className='rounded w-[82px] h-[32px] bg-white flex items-center text-gray-600 hover:text-gray-800  justify-center cursor-pointer'
                  >
                    <CopyOutlined />
                    <span className='ml-2'>复制</span>
                  </span>
                  <RecordIsPraise item={item} sceneType={sceneType} />
                </div>
              ) : null}
            </div>

            {/* {item.content &&
              <>
                {!playState || currentId !== item.id ? <IconPlay style={{ fontSize: '24px' }} className='cursor-pointer' onClick={() => { play(item.content, false, item.id) }} />
                  : <IconPause style={{ fontSize: '24px' }} className='cursor-pointer' onClick={() => { pause() }} />}
              </>
            } */}
          </div>


        </div>
      </div>
    </motion.div>
  )
}
