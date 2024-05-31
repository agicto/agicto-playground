import { memo } from 'react'
import * as React from 'react'

export const IconNavCollapsed = memo<JSX.IntrinsicElements['svg']>(
  function IconNavCollapsed(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z"
          fill="#D8D8D8"
          fillOpacity="0"
        />
        <path
          d="M364.8512 553.9328L204.8 392.1408 364.8512 230.4v323.5328zM819.2 245.0944v65.3568H528.1792V245.0944H819.2z m0 228.7872v65.3568H528.1792V473.856H819.2z m0 228.7616V768H237.1328v-65.3568H819.2z"
          fill="#000000"
          fillOpacity=".65"
        />
      </svg>
    )
  }
)
