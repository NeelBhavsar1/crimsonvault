"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import NavBarDashboard from '@/components/NavBarDashboard/NavBarDashboard'
import { useUser } from '@clerk/nextjs'
import AddRecord from '@/components/AddRecord/AddRecord'
import AiInsights from '@/components/AiInsights/AiInsights'
import ExpenseStats from '@/components/ExpenseStats/ExpenseStats'
import RecordChart from '@/components/RecordChart/RecordChart'
import RecordHistory from '@/components/RecordHistory/RecordHistory'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { ExpenseRecord } from '@/lib/types'

const page = () => {
  const { user, isLoaded } = useUser();
  const [records, setRecords] = useState<ExpenseRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getRecords() {
      setLoading(true)
      try {
        const res = await fetch("/api/expenses")
        const data = await res.json()
        if (data.records && data.records.length > 0) { 
          setRecords(data.records.map((r: any) => ({
            date: new Date(r.date).toLocaleDateString(),
            amount: r.amount,
            category: r.category,
            text: r.text,
            id: r.id
          })))
        
        } else {
          setRecords([])
        }
      } catch (error) {
        console.error(error)
        setRecords([])
      }finally {
        setLoading(false)
      }
    }
    getRecords()
  }, [])

  if (!isLoaded) return <div className={styles.loadingspinner}><LoadingSpinner /></div>


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
            <AddRecord setRecords={setRecords}/>
          </div>
          <div className={styles.right}>
            <RecordChart records={records} />
            <ExpenseStats records = {records}/>
          </div>
        </div>
        
        <AiInsights />
        <RecordHistory records = {records || []} setRecords={setRecords} loading={loading}/>
      </div>
    </div>
  )
}

export default page
