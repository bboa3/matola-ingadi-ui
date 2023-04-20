import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingTable: React.FC = () => (
  <div className='w-full flex items-end flex-col'>
    <Skeleton variant="rounded" width='70%' height={25} />
    <Skeleton className='my-2' animation="wave" variant="rounded" width='100%' height={100} />
    <Skeleton className='my-2' variant="rounded" width='100%' height={130} />
    <Skeleton variant="rounded" width='100%' height={60} />
  </div>
)

export default LoadingTable
