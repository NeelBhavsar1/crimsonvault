import React, { useEffect, useState } from 'react'
import styles from './RecordHistory.module.css'
import { ExpenseRecord } from '@/lib/types'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import {motion} from 'framer-motion'
import { X } from 'lucide-react';


type Props = {
  records: ExpenseRecord[];
  setRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>;
  loading: boolean;
}


const RecordHistory = ({records, setRecords, loading}: Props) => {

  const handleDelete = async (id: string) => {
    const previousRecords = [...records]
    setRecords(records.filter(r => r.id !== id))

    try {
      const res = await fetch (`/api/expenses/${id}`, {method: "DELETE"})
      if (!res.ok) {
        setRecords(previousRecords)
        throw new Error("Failed to delet records")
      }
    } catch (error) {
      console.error(error)

      
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Spending History</p>
        <p className={styles.subtitle}>Review your past expenses at a glance</p>
      </div>
      <div className={styles.recordgrid}>
        {loading ? (
          <LoadingSpinner />
        ) : records.length === 0 ? (
          <p className={styles.norecordmessage}>Add some records to get started!</p>
        ) :
         (
          <div className={styles.recordgrid}>
            {records.map((record) => (
              <div className={styles.recorditem} key={record.id}>
                <motion.button 
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className={styles.deleteBtn} onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Deleting id: ${record.id}`)
                  handleDelete(record.id)
                  
                }}> <X /></motion.button>
                <div className={styles.headeritem}>
                  <div className={styles.headerleft}>
                    <div className={styles.recordtop}>
                      <p className={styles.recorddate}>{record.date}</p>
                      <p className={styles.recordamount}>£{record.amount}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.body}>
                  <p className={styles.categoryname}>{record.category}</p>
                  <p className={styles.recordtext}>{record.text}</p>
                </div>
              </div>
            ))}
            

          </div>
        )
      }

      </div>
    </div>
  )
}

export default RecordHistory