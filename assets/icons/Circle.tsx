import React, { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
}

const CircleIcon: React.FC<Props> = ({ ...i }) => (
  <svg {...i} viewBox="0 0 585 585" xmlns="http://www.w3.org/2000/svg">
    <circle cx="292.5" cy="292.5" r="292.5"/>
  </svg>
)

export default CircleIcon
