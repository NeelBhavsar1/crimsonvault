"use client"

import React, { useState } from 'react'
import styles from './AddRecord.module.css'
import { motion } from 'framer-motion'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { ExpenseRecord } from '@/lib/types'

interface AddRecordProp {
  setRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>
}

const AddRecord = ({setRecords}: AddRecordProp) => {

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          description,
          amount,
          date,
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to add expense.")
      } else {
        setMessage("Expense successfully added!")
        setRecords(prev => [
          ...prev,
          {
            id: data.record.id,
            text: data.record?.text || description,
            date: new Date(date).toLocaleDateString(),
            amount: parseFloat(amount),
            category: category || "Other"
          }
        ])
        setDescription("")
        setAmount("")
        setDate("")
        setCategory("")
      }

    } catch (error) {
      console.error(error)
      setMessage("Failed to create expense.")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <p className={styles.title}>Add new Expense</p>
          <p className={styles.subtitle}>Track your spending with AI assistance</p>
        </div>
      </div>
      <div className={styles.base}>
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.formtop}>
            <div className={styles.formgroup}>
              <label htmlFor='description'>Description</label>
              <input type='text' id='description' name='description' value={description} placeholder='Drinks, groceries, etc...' required onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className={styles.formgroup}>
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' name='date' value={date} required onChange={(e) => setDate(e.target.value)}/>
            </div>
          </div>

          <div className={styles.formbottom}>
            <div className={styles.formgroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={category} required onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Food">🍔 Food & Dining</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Shopping">🛒 Shopping</option>
                <option value="Entertainment">🎬 Entertainment</option>
                <option value="Bills">💡 Bills & Utilities</option>
                <option value="Healthcare">🏥 Healthcare</option>
                <option value="Other">📦 Other</option>
              </select>
            </div>

            <div className={styles.formgroup}>
              <label htmlFor='amount'>Amount (£)</label>
              <input type='number' id='amount' name='amount' value={amount} placeholder='10' required onChange={(e) => setAmount(e.target.value)}/>
            </div>
          </div>
          <motion.button 
          type='submit'
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className={styles.submitbtn}
          disabled={loading}
          >{loading ? <LoadingSpinner /> : "Add Expense"}</motion.button>
        </form>
        {message && <p className={styles.returnmessage}>✅{message}</p>}
      </div>
    </div>
  )
}

export default AddRecord