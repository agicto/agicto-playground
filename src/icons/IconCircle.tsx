import { memo } from 'react'
import * as React from 'react'

export const IconCircle = memo<JSX.IntrinsicElements['svg']>(
  function IconCircle(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="none"
        version="1.1"
        viewBox="0 0 14 14"
        {...props}
      >
        <g>
          <g>
            <path
              d="M7.00003,0C5.25052,0,3.65092,0.641816,2.42383,1.70283L3.12219,2.95989C4.12847,1.99379,5.4949,1.4,7.00003,1.4C10.0928,1.4,12.6,3.9072,12.6,7L10.5,7L12.7325,11.0184C13.5312,9.88106,14,8.49527,14,7C14,3.13401,10.866,0,7.00003,0ZM7,14.0001C8.74951,14.0001,10.3491,13.3583,11.5762,12.2973L10.8779,11.0402C9.87154,12.0063,8.50514,12.6001,7,12.6001C3.9072,12.6001,1.4,10.0929,1.4,7.00008L3.5,7.00008L1.26756,2.98169C0.468853,4.11899,0,5.50478,0,7.00008C0,10.866,3.13401,14.0001,7,14.0001Z"
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="0.6499999761581421"
            />
          </g>
        </g>
      </svg>
    )
  }
)
