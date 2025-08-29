"use client"

import React from 'react'
import styles from './page.module.css'
import NavBarHome from '@/components/NavBarHome/NavBarHome'
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUser, UserButton, useClerk } from "@clerk/nextjs"
import Footer from '@/components/Footer/Footer'

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
            {/*<AnimatedBackground /> UNDO LATER*/}
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


      <Footer />
    </div>
  )
}

export default page