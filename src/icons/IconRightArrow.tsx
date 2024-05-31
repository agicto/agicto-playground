import { memo } from 'react'

export const IconRightArrow = memo<JSX.IntrinsicElements['svg']>(
  function IconRightArrow(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 8L22 12L18 16" />
        <path d="M2 12H22" />
      </svg>
    )
  }
)
