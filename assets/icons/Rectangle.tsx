import React, { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
}

const RectangleIcon: React.FC<Props> = ({ ...i }) => (
  <svg {...i} viewBox="0 0 320 287" xmlns="http://www.w3.org/2000/svg">
    <path d="M125.065 20C140.461 -6.66663 178.952 -6.66666 194.348 20L313.859 227C329.255 253.667 310.01 287 279.218 287H40.195C9.40299 287 -9.84203 253.667 5.55398 227L125.065 20Z" />
  </svg>
)

export default RectangleIcon
