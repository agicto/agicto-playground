import { memo } from 'react'
import * as React from 'react'

export const IconDot = memo<JSX.IntrinsicElements['svg']>(function IconDot(
  props
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      viewBox="0 0 8 8"
      {...props}
    >
      <g>
        <ellipse cx="4" cy="4" rx="4" ry="4" fill="#FFFFFF" fillOpacity="1" />
        <ellipse
          cx="4"
          cy="4"
          rx="3.5"
          ry="3.5"
          fillOpacity="0"
          strokeOpacity="1"
          stroke="#3162FF"
          fill="none"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
})
