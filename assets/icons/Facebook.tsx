import React, { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
}

const FacebookIcon: React.FC<Props> = ({ ...i }) => (
  <svg {...i} viewBox="0 0 186 364" fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.6 363.6V182H0.0666504V121.467H60.6V88.9603C60.6 27.413 90.5791 0.399994 141.73 0.399994C166.231 0.399994 179.185 2.21599 185.314 3.04833V60.9333H150.431C128.715 60.9333 121.133 72.3893 121.133 95.6038V121.467H184.769L176.128 182H121.133V363.6H60.6Z"/>
  </svg>
)

export default FacebookIcon
