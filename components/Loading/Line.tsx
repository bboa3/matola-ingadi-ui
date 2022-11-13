import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingLine: React.FC = () => (
  <div className='w-full flex items-end flex-col'>
    <Skeleton variant="rounded" width='100%' height={25} />
  </div>
)

export default LoadingLine
