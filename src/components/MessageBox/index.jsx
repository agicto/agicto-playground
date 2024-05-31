import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import logo from '@/public/next.svg'
// import { toast } from 'react-toastify'
import Empty from './Empty'
import { Markdown } from '../Markdown'
import { Tabs } from '../Tabs'
import copy from 'copy-to-clipboard'

const tabData = [
  {
    count: 1,
    value: 1,
    label: 'GPT3.5',
    icon: (
      <svg
        stroke="currentColor"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        strokeWidth={1.5}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path d="M956.408445 419.226665a250.670939 250.670939 0 0 0-22.425219-209.609236A263.163526 263.163526 0 0 0 652.490412 85.715535 259.784384 259.784384 0 0 0 457.728923 0.008192a261.422756 261.422756 0 0 0-249.44216 178.582564 258.453206 258.453206 0 0 0-172.848261 123.901894c-57.03583 96.868753-44.031251 219.132275 32.153053 302.279661a250.670939 250.670939 0 0 0 22.32282 209.609237 263.163526 263.163526 0 0 0 281.595213 123.901893A259.067596 259.067596 0 0 0 566.271077 1023.990784a260.60357 260.60357 0 0 0 249.339762-178.889759 258.453206 258.453206 0 0 0 172.848261-123.901893c57.445423-96.868753 44.13365-218.82508-32.050655-302.074865zM566.578272 957.124721c-45.362429 0-89.496079-15.666934-124.516283-44.543243 1.638372-0.921584 4.198329-2.150363 6.143895-3.481541l206.537289-117.757998a32.35785 32.35785 0 0 0 16.895713-29.081105V474.82892l87.243317 49.97035c1.023983 0.307195 1.638372 1.228779 1.638372 2.252762v238.075953c0 105.8798-86.936122 191.689541-193.942303 191.996736zM148.588578 781.102113a189.846373 189.846373 0 0 1-23.346803-128.612213c1.535974 1.023983 4.09593 2.559956 6.143895 3.48154L337.922959 773.729439c10.444622 6.143896 23.346803 6.143896 34.098621 0l252.30931-143.664758v99.531108c0 1.023983-0.307195 1.945567-1.331177 2.559956l-208.892449 118.986778a196.297463 196.297463 0 0 1-265.518686-70.04041zM94.112704 335.97688c22.630015-39.013737 58.367008-68.81163 101.16948-84.171369V494.591784c0 11.7758 6.45109 22.93721 16.793315 28.978707l252.30931 143.767156L377.141493 716.796006a3.174346 3.174346 0 0 1-2.867152 0.307195l-208.892448-118.986777A190.870355 190.870355 0 0 1 94.215102 335.874482z m717.607001 164.861198L559.410394 357.070922 646.653711 307.20297a3.174346 3.174346 0 0 1 2.969549-0.307195l208.892449 118.986777a190.358364 190.358364 0 0 1 70.961994 262.139544 194.556693 194.556693 0 0 1-101.16948 84.171369V529.407192a31.538664 31.538664 0 0 0-16.588518-28.671513z m87.03852-129.329002c-1.74077-1.023983-4.300727-2.559956-6.246294-3.48154l-206.639687-117.757999a34.09862 34.09862 0 0 0-33.996222 0L399.566711 393.934295v-99.531108c0-1.023983 0.307195-1.945567 1.331178-2.559956l208.892449-119.089176a195.990268 195.990268 0 0 1 265.518686 70.450003c22.732414 38.706542 31.129071 84.171369 23.346803 128.305018zM352.258716 548.862861l-87.243317-49.560757a2.457558 2.457558 0 0 1-1.638372-2.252762V258.870991c0-105.8798 87.243317-191.996736 194.556692-191.689541a194.556693 194.556693 0 0 1 124.209089 44.543243c-1.638372 0.921584-4.198329 2.252762-6.143896 3.48154l-206.639687 117.757999a31.948257 31.948257 0 0 0-16.793315 29.081105l-0.307194 286.715126z m47.307995-100.759887L512 384.001664l112.535687 63.998912v127.997824l-112.228492 63.998912-112.535687-63.998912-0.307195-127.997824z" />
      </svg>
    )
  },
  {
    count: 5,
    value: 2,
    label: 'GPT4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    count: 1,
    value: 3,
    label: '360智脑',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    )
  },
  {
    count: 1,
    value: 4,
    label: '文心一言',
    icon: (
      <svg
        stroke="currentColor"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        strokeWidth={1.5}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M10.5 184.3H513c-35.3-67-62.8-115.9-82.7-146.6L511 0c19.5 30 48.9 78.9 88 146.6l-75.4 37.7h492.1v77.5H822.4c-37.3 199.3-117.6 359.5-240.8 480.6 92.8 67.7 240.3 128.4 442.4 182.2-32.1 36.3-56.5 66.7-73.3 91.1C753.9 947.6 608.5 876.4 514.6 802c-94.2 73.3-244.8 147.3-451.8 222-18.1-24.4-39.1-51.7-62.8-81.7 199.6-60 349.9-126.9 450.7-200.5-127.3-136.1-208.3-296.1-242.9-480H10.5v-77.5z m722.4 77.5H291.6C323 433.5 398 575.3 516.7 687.4 630.1 582 702.2 440.1 732.9 261.8z" />
      </svg>
    )
  },
  {
    count: 1,
    value: 5,
    label: '讯飞星火',
    icon: (
      <svg
        stroke="currentColor"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        strokeWidth={1.5}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          d="M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8 44.8-86.4-201.6-230.4-246.4-236.8-249.6-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8 12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6 12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8-22.4 41.6-44.8 86.4-54.4 134.4-32 153.6 35.2 265.6 224 368 6.4 3.2 9.6 3.2 16 3.2 9.6 0 19.2-6.4 25.6-12.8 9.6-16 6.4-35.2-9.6-44.8l-3.2-3.2c-188.8-105.6-214.4-192-192-297.6 9.6-41.6 28.8-76.8 48-118.4 12.8-19.2 22.4-38.4 28.8-57.6 0 9.6 3.2 22.4 3.2 32 0 12.8 9.6 25.6 22.4 28.8 12.8 3.2 25.6 0 35.2-9.6 112-134.4 172.8-256 179.2-364.8 51.2 32 137.6 108.8 182.4 272 3.2 9.6 9.6 19.2 22.4 22.4 9.6 3.2 22.4 0 28.8-6.4 25.6-22.4 38.4-54.4 41.6-86.4 54.4 67.2 115.2 176 108.8 288-6.4 92.8-57.6 172.8-150.4 243.2 35.2-166.4-32-358.4-179.2-457.6-9.6-6.4-22.4-6.4-32-3.2-9.6 6.4-16 16-16 28.8-3.2 89.6-48 144-89.6 198.4-35.2 44.8-70.4 89.6-76.8 150.4 0 16 12.8 32 28.8 35.2 19.2 3.2 32-12.8 35.2-28.8 3.2-41.6 32-76.8 60.8-115.2 35.2-44.8 76.8-99.2 96-176 115.2 108.8 153.6 300.8 83.2 435.2v3.2c0 3.2 0 3.2-3.2 6.4v12.8c0 3.2 0 3.2 3.2 6.4v3.2l3.2 3.2c0 3.2 3.2 3.2 3.2 6.4 0 0 3.2 3.2 6.4 3.2l3.2 3.2s3.2 0 3.2 3.2h19.2c3.2 0 6.4 0 9.6-3.2 163.2-89.6 252.8-208 259.2-345.6 9.6-214.4-169.6-393.6-204.8-416z"
          fill="currentColor"
        />{' '}
      </svg>
    )
  }
]

const ChatImg = () => (
  <Image
    src={logo}
    alt="西鲸"
    style={{
      width: 'auto',
      height: '15px'
    }}
  />
)

const UserImg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CB8767" className="w-10 h-10">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)
const MessageBox = ({ title, desc, onSubmit, record = [], generateLoading }) => {
  const [inputText, setInputText] = useState('')
  const [recordText, setRecordText] = useState('')
  const isUseInputMethod = useRef(false)
  const textareaRef = useRef(null)
  const [modelLevel, setModalLevel] = useState('gpt3')
  const [modelCount, setModelCount] = useState(1)
  const messageRef = useRef(null)
  const tabChange = e => {
    setModalLevel(e.value)
    setModelCount(e.count)
  }

  const submit = event => {
    if (!inputText) return
    if (textareaRef.current) {
      textareaRef.current.value = ''
      setInputText('')
    }
    setRecordText(inputText)

    onSubmit && onSubmit({ ...event, inputText, modelLevel })
  }

  const handleKeyUp = e => {
    if (e.code === 'Enter') {
      if (generateLoading) return
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current) {
        submit(e)
      }
    }
  }

  const onInputKeyDown = e => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setInputText(inputText.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  const onWheel = event => {
    if (event.deltaY !== 0) {
      messageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  const onItemClick = item => {
    if (textareaRef.current) {
      textareaRef.current.value = item
    }
    setInputText(item)
  }

  const onResend = () => {
    onSubmit && onSubmit({ inputText: recordText, modelLevel })
  }

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [record])

  console.log('generateLoading', generateLoading)

  return (
    <div className=" h-full flex flex-col shadow rounded-2xl bg-[white]">
      <div className="p-2 md:p-5 h-[60px] md:h-[80px] flex items-center border-b justify-between ">
        <div className="font-bold ml-2 text-2xl ">{title && <h4 className="mb-0">{title}</h4>}</div>
        <div className="right">
          <Tabs list={tabData} onChange={tabChange} />
        </div>
      </div>
      {record?.length > 0 && (
        <p className="mt-1 md:text-center shadow sticky top-0 text-md text-gray-500  ">
          请遵守
          <a target="_blank" className="font-bold text-gray-900 cursor-pointer underline" href="/security">
            内容安全协议
          </a>
          ，禁止提交违规内容，违规内容会被系统拦截，严重者可能会被注销账号。
        </p>
      )}
      <div onWheel={onWheel} className="center relative grow p-5 overflow-scroll">
        {record?.length === 0 && <Empty onItemClick={onItemClick} />}
        <div ref={messageRef} className="bg-white md:p-10">
          {record?.map((item, index) => {
            return (
              <div key={index} className="my-4">
                {item.isAnswer ? (
                  <motion.div
                    key={index}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <div className="flex">
                      <div className="flex w-[35px] h-[35px] rounded-full p-1 items-center border justify-center   rounded">
                        <ChatImg />
                      </div>
                      <div className="ml-2 mb-[25px] relative max-w-[80%] py-3 px-4 bg-[#b2f1e8]   font-bold rounded-tr-2xl rounded-b-2xl">
                        <Markdown loading={generateLoading && index === record?.length - 1} content={item.content} />
                        {item?.canResend && (
                          <span
                            onClick={onResend}
                            className="absolute right-[25px] top-[100%] w-[25px] h-[25px] flex items-center text-gray-400 hover:text-gray-800  justify-center cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                          </span>
                        )}
                        {item.content && !generateLoading && (
                          <span
                            onClick={() => {
                              copy(item.content)
                              toast.success('复制成功')
                            }}
                            className="absolute right-0 top-[100%] w-[25px] h-[25px] flex items-center text-gray-400 hover:text-gray-800  justify-center cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <div className="flex justify-end">
                      <div className="mr-2 max-w-[80%] py-3 px-4 bg-[#f0f0f0]  font-bold rounded-tl-2xl rounded-b-2xl">
                        <Markdown content={item.content} loading={generateLoading && index === record?.length - 1} />
                      </div>
                      <UserImg />
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="h-[60px] md:h-[80px] border-t box-border shrink-0	 flex items-center rounded-b-lg  overflow-hidden">
        <textarea
          ref={textareaRef}
          onKeyUp={handleKeyUp}
          onKeyDown={onInputKeyDown}
          onChange={e => {
            setInputText(e?.target?.value)
          }}
          className="block h-[60px] md:h-[80px] p-2 md:p-5 md:leading-[25px]	  box-border resize-none w-full text-lg font-[600] text-gray-900   focus:outine-none focus:border-none focus:ring-0"
          placeholder="请输入问题，可通过cmd+回车换行"
        />
        <button
          disabled={generateLoading}
          onClick={submit}
          type="button"
          className="md:w-[120px] w-[70px] h-[60px] md:h-[80px] flex flex-col justify-center items-center p-3 border border-transparent   shadow-sm text-white text-md font-bold bg-[#13A8A8]  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="md:text-[14px] text-sm">消耗{modelCount}个水滴</span>
        </button>
      </div>
    </div>
  )
}

export default MessageBox
