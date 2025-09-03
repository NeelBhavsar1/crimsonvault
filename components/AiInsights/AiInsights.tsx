import React, { useEffect, useState } from 'react'
import styles from './AiInsights.module.css'
import Image from 'next/image'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ReactMarkdown from 'react-markdown'

interface Insights {
  highSpending: string;
  savingsTips: string[];
  lifestyleTips: string[];
  upcomingExpenses: string;
}


const AiInsights = () => {
  const [insights, setInsights] = useState<Insights>({
    highSpending: "",
    savingsTips: [],
    lifestyleTips: [],
    upcomingExpenses: ""
  });
  const [loading, setLoading] = useState<boolean>(false)

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/ai-insights")
      const data = await res.json()
      setInsights(data)
    } catch (error) {
      console.error("Failed to fetch ai insights", error)
    } finally {
      setLoading(false)
    }
  }  

  useEffect(() => {
    fetchInsights()
  }, [])
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.title}>AI Insights</p>
          <p className={styles.subtitle}>AI financial insights</p>
        </div>
        <div className={styles.right}>
          <p className={styles.timing}> </p>
          <button className={styles.reloadbutton} onClick={fetchInsights}><Image src="/refresh.png" alt='refresh icon' width={50} height={50} className={styles.reloadicon}/></button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodytop}>
          <div className={styles.bodytopleft}>
            <h3>High Spending</h3>
            {loading ? <LoadingSpinner /> : <ReactMarkdown>{insights.highSpending}</ReactMarkdown>}
          </div>
          <div className={styles.bodytopright}>
            <h3>Spending Tips</h3>
            {loading ? <LoadingSpinner /> : (
              <ReactMarkdown>
                {insights.savingsTips.join("\n\n- ")}
              </ReactMarkdown>
            )}
          </div>
        </div>

        <div className={styles.bodybottom}>
          <div className={styles.bodybottomleft}>
            <h3>Lifestyle Tips</h3>
            {loading ? <LoadingSpinner /> : (
              <ReactMarkdown>
                {insights.lifestyleTips.join("\n\n- ")}
              </ReactMarkdown>
            )}
          </div>
          <div className={styles.bodybottomright}>
            <h3>Upcoming Expenses</h3>
            {loading ? <LoadingSpinner /> : <ReactMarkdown>{insights.upcomingExpenses}</ReactMarkdown>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AiInsights