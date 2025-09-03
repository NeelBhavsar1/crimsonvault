"use client"

import React from 'react'
import styles from './RecordChat.module.css'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { ExpenseRecord } from '@/lib/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const RecordChart = ({ records }: { records: ExpenseRecord[] }) => {

  const dates = Array.from(new Set(records.map(r => r.date)))
  const categories = Array.from(new Set(records.map(r => r.category)))

  
  const datasets = categories.map((cat, i) => ({
    label: cat,
    data: dates.map(date =>
      records
        .filter(r => r.date === date && r.category === cat)
        .reduce((sum, r) => sum + r.amount, 0)
    ),
    backgroundColor: `hsl(${i * 60}, 70%, 50%)`,
    borderWidth: 1,
    borderRadius: 4
  }))

  const chartData = {
    labels: dates,
    datasets
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Amount: £${context.raw}`
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: "Date" }
      },
      y: {
        stacked: true,
        title: { display: true, text: "Amount (£)" },
        beginAtZero: true
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Recent Transactions</p>
        <p className={styles.subtitle}>Track your spending patterns at a glance</p>
      </div>

      <div className={styles.chart}>
        <div>

          <Bar data={chartData} options={options} height={300}/>

        </div>
      </div>
      
    </div>
  )
}

export default RecordChart
