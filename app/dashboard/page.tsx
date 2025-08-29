import React from 'react'
import stlyes from './page.module.css'
import NavBarDashboard from '@/components/NavBarDashboard/NavBarDashboard'

const page = () => {
  return (
    <div className={stlyes.container}>
        <NavBarDashboard />
    </div>
  )
}

export default page