import React from 'react'

interface Props {
  label: string
}
const Chip: React.FC<Props> = ({ label }) => (
  <p
    className='text-sm bg-emerald-500 text-white py-0.5 px-4 rounded-full'>
    {label}
  </p>
)

export default Chip
