import { memo } from 'react'
import * as React from 'react'

export const IconUpload = memo<JSX.IntrinsicElements['svg']>(
  function IconUpload(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        version="1.1"
        viewBox="0 0 16 14"
        {...props}
      >
        <g>
          <path
            d="M8.8002,10.1111L8.8002,4.66667L12.8002,4.66667L8.0002,0L3.2002,4.66667L7.2002,4.66667L7.2002,10.1111L8.8002,10.1111ZM14.4,12.4444L1.6,12.4444L1.6,7L0,7L0,13.2222C0,13.6518,0.358176,14,0.8,14L15.2,14C15.6418,14,16,13.6518,16,13.2222L16,7L14.4,7L14.4,12.4444Z"
            fillRule="evenodd"
            fill="#FFFFFF"
            fillOpacity="1"
          />
        </g>
      </svg>
    )
  }
)
