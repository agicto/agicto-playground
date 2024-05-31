import { memo } from 'react'
import * as React from 'react'

export const IconShare = memo<JSX.IntrinsicElements['svg']>(function IconShare(
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
        fillOpacity="0"
      ></path>
      <path
        d="M341.333333 213.333333v116.778667L124.586667 533.333333l216.704 203.136L341.333333 853.333333l-341.333333-320L341.333333 213.333333z m256 192V213.333333l-341.333333 320 341.333333 320v-192h85.333334l13.354666 0.213334a384.085333 384.085333 0 0 1 326.613334 205.013333c0.896-11.392 1.365333-22.912 1.365333-34.56 0-235.648-191.018667-426.666667-426.666667-426.666667z m-85.333333 4.949334L380.757333 533.333333l131.2 123.008V576h172.16l14.805334 0.256c54.784 1.877333 107.690667 13.226667 156.8 32.725333A340.565333 340.565333 0 0 0 597.333333 490.666667h-85.333333V410.282667z"
        fill="#000000"
        fillOpacity=".65"
      ></path>
    </svg>
  )
})