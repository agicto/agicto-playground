
import React, { useState, useEffect } from 'react'
import { Image, Modal } from '@nextui-org/react'
import { HashLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { Markdown } from '@/components/Markdown'
import { isPc } from '@/utils'
import { ChatImg } from '@/components/AIChatModules/ChattingAdapterComponents/HeaderImage'


export const AIImgAnswer = (props: any) => {

  const { generateImgLoading, item, openImgFormValues, index, recordImg } = props
  const [visibility, setVisibility] = useState(false)
  const [previewImg, setPreviewImg] = useState('')

  const loadingImg = new Array(openImgFormValues?.n).fill('')
    return (
        <div className='pl-[24px]'>
        
        {generateImgLoading && index === recordImg?.length - 1 ?
                            
          <div className="flex flex-wrap justify-start">
            {
                    
              loadingImg?.map((item, index) => {
                return (
                  <span key={ index } className=" z-[9] bg-[#F2F8FF] flex  items-center justify-center w-[248px] h-[248px]  mr-[10px] mb-[10px]">
                
                      <HashLoader color="#3b82f6" />
                
                      {/* <span className="font-bold text-white text-2xl">{imgDetail?.progress || '0%'}</span> */}
                    </span>    
                )
              })
        
            }
                                  
          </div>: null}
          <div className="flex flex-wrap justify-start">          
            {
              item?.imgUrl && (
                item?.imgUrl?.map((imgItem: any, index:any) => {
                  return (
                    <Image showSkeleton   maxDelay={3000} key={index} className="opacity-100 mr-[10px] mb-[10px]" containerCss={{ marginRight: '10px', marginBottom: '10px', marginLeft: '0px' }} src={imgItem?.url} width={258} height={258} onClick={() => {
                      setVisibility(true)
                      setPreviewImg(imgItem?.url)
                      }}/>
          
                  )
                })
                    
              )
            } 
          </div>

          {
            item?.errorText && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
            >
              <div className={`flex justify-end py-[20px] ${isPc() ? 'px-[0px]' : ' px-[15px]'}`}>
                {/* <UserImg /> */}
                <div
                  className='flex w-[35px] h-[35px] rounded-full p-1 items-center border justify-center border-solid border-[#E8E8E8] flex-none'>
                  <ChatImg siteConfig={undefined} generateLoading={false} recordItem={{
                    content: undefined,
                    id: undefined,
                    isAnswer: undefined,
                    msgTime: undefined,
                    canResend: undefined,
                    isPraise: undefined,
                    imgList: undefined,
                    modelId: undefined,
                    fileList: undefined,
                    generateLoading: undefined,
                    imgUrl: undefined
                  }} />
                </div>
                <div className="mr-2 w-full py-3 pt-0 pl-[10px]">
                  {/* <CustomerImageMsg fileList={item.imgList} /> */}
                  <Markdown content={item.errorText || ''} />
                </div>
              </div>
            </motion.div>
            )
          }
        <Modal
            closeButton
            onClose={() => {
              setVisibility(false)
              setPreviewImg('')
          }}
            open={visibility}
        >
            
            <Modal.Body>
            
              {previewImg ? (
                <a href={previewImg} className="flex flex-col items-center justify-center" target="_blank" rel="noreferrer">
                  <Image src={previewImg} alt="xijing" width={500} height={500} />
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {/* <HashLoader width={5} color="#36d7b7" /> */}
                  <span>正在努力生成中...</span>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
  
    )
}

