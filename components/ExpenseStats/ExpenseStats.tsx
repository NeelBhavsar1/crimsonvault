"use client"

import React, { useMemo } from 'react'
import styles from './ExpenseStats.module.css'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { ExpenseRecord } from '@/lib/types'
import { motion } from 'framer-motion'

interface ExpenseStatsProps {
  records: ExpenseRecord[]
}

/*
passed in prop record with types defined in /lib/types.ts
react.fc functional compnent taking in optional type argument for props
useMemo react hook for caching expensive calculation and re runs when record dependency changes
when records changes it recalcuates the average. highes,t lowest
*/
const ExpenseStats: React.FC<ExpenseStatsProps> = ({ records }) => {
  const { average, highest, lowest } = useMemo(() => {
    if (!records || records.length === 0) {
      return { average: 0, highest: 0, lowest: 0 }
    }

    const amounts = records.map(r => r.amount)
    const total = amounts.reduce((a, b) => a + b, 0)

    return {
      average: (total / amounts.length).toFixed(2),
      highest: Math.max(...amounts),
      lowest: Math.min(...amounts)
    }
  }, [records])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Expense Statistics</p>
        <p className={styles.subtitle}>Your spending insights and ranges</p>
      </div>
      <div className={styles.infocontainer}>
        <motion.div 
        whileHover={{scale: 1.05}}
        className={styles.top}>
          <p>Average Daily Spending</p>
          <h1>£{average}</h1>
        </motion.div>
        <div className={styles.bottom}> 

          <motion.div 
          whileHover={{scale: 1.05}}
          className={styles.lowest}>
            <ArrowDown color="lightgreen" /> Lowest: £{lowest}
          </motion.div>
          
          <motion.div 
          whileHover={{scale: 1.05}}
          className={styles.highest}>
            <ArrowUp color="red" /> Highest: £{highest}
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}

export default ExpenseStats
