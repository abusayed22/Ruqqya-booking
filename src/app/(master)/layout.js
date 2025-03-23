import MasterLayout from '@/layout/masterLayout/MasterLayout'
import React from 'react'

const layout = ({children}) => {
  return (
    <MasterLayout>{children}</MasterLayout>
  )
}

export default layout