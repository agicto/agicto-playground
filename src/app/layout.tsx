'use client'
 import { ToastContainer, toast } from 'react-toastify'
import Script from 'next/script'
import StyledComponentsRegistry from '@/lib/AntdRegistry'

// import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
 // @ts-ignore
function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script id="sse" src="https://ew6.cn/sse.js"></Script>

      <Script id="baidutongji">
        {`var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?983fca994414ee989e1b88bd0193f557";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`}
      </Script>
      <body>
        <ToastContainer
          style={{
            zIndex: 999999
          }}
        />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
export default RootLayout
