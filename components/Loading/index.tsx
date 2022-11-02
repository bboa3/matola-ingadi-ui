import React from 'react'

const Loading: React.FC = () => (
  <div className="w-full h-[80vh] flex justify-center items-center">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" xmlSpace="preserve">
    <rect x="0" y="0" width="4" height="20" className='fill-sky-900'>
      <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="7" y="0" width="4" height="20" className='fill-sky-900'>
      <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="14" y="0" width="4" height="20" className='fill-sky-900'>
      <animate attributeName="opacity" attributeType="XML" values="1; .2; 1" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
</div>
)

export default Loading
