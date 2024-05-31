'use client'
import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
 import { icon_logo_color } from "../../consts/img"
import baseHooks from '../../hooks/base'
import { getLocalStorage } from '../../utils/localStorage'
const hiddenPath = ['/space', "/login"]


const navigation = [
  { name: '首页', href: '/' },
  { name: '模型广场', href: '/model', target: '_self' },
  { name: '调试平台', href: '/playground/', target: '_self' },
  { name: 'Prompt工程', href: '/prompt', target: '_self' },
  { name: '开发文档', href: '/docs', target: '_self' },
  { name: '计费规则', href: '/docs/pricing', target: '_self' }
]

const Headers = () => {
  const [userInfo, setUserInfo] = useState<any>({})
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let isShowHeader = true
  hiddenPath.forEach(item => {
    if (pathname.includes(item)) {
      isShowHeader = false
    }
  })

  useEffect(() => {
    const localUserInfo: any = JSON.parse(getLocalStorage('userInfo') || '{}')
    setUserInfo(localUserInfo)
  },[])

  if (!isShowHeader) return null

  return (
    <header className="bg-white w-full z-[999] fixed top-0 left-0">
      <nav className="flex items-center justify-between bg-transparent	py-[15px] lg:px-8 " aria-label="Global">
        
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center-m-1.5 p-1.5">
            <img className="h-[25px]" src={icon_logo_color} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => {
            const isActive = item?.href === pathname
            return (
              <a key={item.name} href={item.href} target={item?.target} className="text-sm flex flex-col  items-center font-semibold leading-6 text-gray-900 ">
                <span className={`${isActive ? 'text-[#3162FF]' : ''}`}>{item.name}</span>
                {isActive ? <span className="block mt-3 w-2/3 rounded-full h-1 bg-[#3162FF]" /> : null}{' '}
              </a>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userInfo?.name ? (
            <a href="/space" className="text-sm font-semibold leading-6 text-gray-900">
              个人中心
            </a>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              注册/登录
            </a>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-[35px]" src={icon_logo_color} alt="" />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {userInfo?.name ? (
                  <a href="/space" className="text-sm font-semibold leading-6 text-gray-900">
                    个人中心
                  </a>
                ) : (
                  <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                    注册/登录
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Headers
