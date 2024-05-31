import { memo } from 'react'
import * as React from 'react'

export const IconSort = memo<JSX.IntrinsicElements['svg']>(function IconSort(
  props
) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0m0 0l1024 0q0 0 0 0l0 1024q0 0 0 0l-1024 0q0 0 0 0l0-1024q0 0 0 0Z"
        fill="#D8D8D8"
        fillOpacity=".01"
      ></path>
      <path
        d="M768 153.6l153.6 210.8416h-115.2V870.4h-76.8V364.4416H614.4L768 153.6zM460.8 204.8v102.4H102.4V204.8h358.4z m102.4 256v102.4H102.4V460.8h460.8z m0 256v102.4H102.4v-102.4h460.8z"
        fill="#000000"
        fillOpacity=".65"
      ></path>
    </svg>
  )
})
