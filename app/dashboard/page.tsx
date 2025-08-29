"use client"

import React from 'react'
import styles from './page.module.css'
import NavBarDashboard from '@/components/NavBarDashboard/NavBarDashboard'
import { useUser } from '@clerk/nextjs'
import AddRecord from '@/components/AddRecord/AddRecord'
import AiInsights from '@/components/AiInsights/AiInsights'
import ExpenseStats from '@/components/ExpenseStats/ExpenseStats'
import RecordChart from '@/components/RecordChart/RecordChart'
import RecordHistory from '@/components/RecordHistory/RecordHistory'

const page = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading page...</p>

  return (
    <div className={styles.pageContainer}>
      <NavBarDashboard />
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.welcome}>
              <div className={styles.welcomeleft}>
                <img src={user?.imageUrl} alt={`${user?.firstName}'s profile`} className={styles.avatar}/>
              </div>
              <div className={styles.welcomeright}>
                <div className={styles.welcometop}>
                  <p>Welcome back, {user?.firstName}</p>
                  <p>Stay on top of your finances with clear insights into 
                    your recent expenses and smarter budgeting tips.
                  </p>
                </div>
                <div className={styles.welcomebottom}>
                  <div className={styles.welcomeitem}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RecordChart />
            <ExpenseStats />
          </div>
        </div>
        <AddRecord />
        <AiInsights />
        <RecordHistory />
      </div>
    </div>
  )
}

export default page
