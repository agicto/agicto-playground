import { memo } from 'react'
import * as React from 'react'

export const IconMenuCollapsed = memo<JSX.IntrinsicElements['svg']>(
  function IconMenuCollapsed(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
      >
        <path
          d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z"
          fillOpacity="0"
        ></path>
        <path d="M659.1488 256L819.2 417.7664l-160.0512 161.7664V256z m-163.328 14.6944v65.3568H204.8v-65.3568h291.0208z m0 228.7872v65.3568H204.8V499.456h291.0208z m291.0464 228.7616V793.6H204.8v-65.3568h582.0672z"></path>
      </svg>
    )
  }
)
