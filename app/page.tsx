"use client"

import React from 'react'
import styles from './page.module.css'
import NavBarHome from '@/components/NavBarHome/NavBarHome'
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUser, UserButton, useClerk } from "@clerk/nextjs"
import Footer from '@/components/Footer/Footer'
import GridItem from '@/components/GridItem/GridItem'


const page = () => {

  const {user} = useUser()
  const {openSignIn} = useClerk()
  const router = useRouter();

  return (
    <div className={styles.container}>
      <NavBarHome />
        <section id="home">
        <div className={styles.hero} >
          <div className={styles.bgvideo}>
            {/*<AnimatedBackground />*/}
          </div>
          <div className={styles.herocontent}>
            <h1>Welcome to Crimson<span>Vault</span></h1>
            <p>Track, manage, and grow your finances effortlessly with AI-powered insights—all in one place.</p>

            <div className={styles.buttons}>
              {user ? (
                <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => router.push("/dashboard")}
                > Open Dashboard
                </motion.button>
              ) : (
                <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => openSignIn()}
                >
                  Get Started
                </motion.button>
              )}

              <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              >Watch Demo</motion.button>

            </div>
          </div>

          
        </div>
      </section>

      <div className={styles.restpage}>


      <section>
        <div className={styles.featurescontainer}>
          <div className={styles.featuresheader}>
            <h1>Features</h1>
            <p>CrimsonVault is an AI-powered expense tracker designed to help you take control of your finances, 
              track spending patterns, and make smarter money decisions
            </p>
          </div>
          <div className={styles.featuresbody}>
            <div className={styles.featuresgrid}>

              <GridItem 
                name='Smart AI Reviews'
                onClick={() => router.push("/dashboard")}
                description='Automatically analyze your spending patterns and generate an easy-to-read summary. The AI highlights unusual expenses, savings opportunities, and monthly financial health in simple language.'
                imagelink='/ai.png'
              />

              <GridItem 
                name="Bar Charts"
                onClick={() => router.push("/dashboard")}
                description="Visualize your spending trends with interactive bar charts. Quickly compare daily, weekly, or monthly expenses to spot peaks and dips in your financial activity."
                imagelink="/bar-chart.png"
              />

              <GridItem 
                name="AI Insights"
                onClick={() => router.push("/dashboard")}
                description="Get smart, personalized suggestions powered by AI. From predicting future expenses to offering tips on saving, AI Insights help you make informed financial decisions."
                imagelink="/insight.png"
              />

              <GridItem 
                name="Expense Tracking"
                onClick={() => router.push("/dashboard")}
                description="Keep a record of every expense in one place. Categorize transactions, view totals, and monitor your spending habits to stay on top of your budget."
                imagelink="/tracker.png"
              />

              <GridItem 
                name="Add Records"
                onClick={() => router.push("/dashboard")}
                description="Easily log new expenses or income entries with a simple form. Adding transactions takes just seconds, making it effortless to stay organized."
                imagelink="/records.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        
      </section>

      

      

      
        

      </div>

      <Footer />
    </div>
  )
}

export default page