"use client"

import React from 'react'
import styles from './AddRecord.module.css'
import { motion } from 'framer-motion'

const AddRecord = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <p className={styles.title}>Add new Expense</p>
          <p className={styles.subtitle}>Track your spending with AI assistance</p>
        </div>
      </div>
      <div className={styles.base}>
        <form className={styles.form}>

          <div className={styles.formtop}>
            <div className={styles.formgroup}>
              <label htmlFor='description'>Description</label>
              <input type='text' id='description' name='description' placeholder='Drinks, groceries, etc...' required/>
            </div>

            <div className={styles.formgroup}>
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' name='date' required/>
            </div>
          </div>

          <div className={styles.formbottom}>
            <div className={styles.formgroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
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
              <input type='number' id='amount' name='amount' placeholder='10' required/>
            </div>
          </div>
          <motion.button 
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className={styles.submitbtn}>Add Expense</motion.button>
        </form>
      </div>
    </div>
  )
}

export default AddRecord