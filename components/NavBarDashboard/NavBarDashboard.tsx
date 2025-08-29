"use client"

import React, { useEffect, useState } from 'react'
import styles from './NavBarDashboard.module.css'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NavBarDashboard = () => {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme() 
  const router = useRouter();

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={styles.container}>
      
      <div className={styles.logo}>
        <Image
          src="/crimson.png"
          alt="crimson logo"
          width={65}
          height={65}
          className={styles.crimsonimage}
          onClick={() => router.push("/")}
        />
        <p>Crimson<span>Vault</span></p>
      </div>

      
      <div className={styles.actionbuttons}>
        {mounted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={styles.togglebtn}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </motion.button>
        )}

        {user && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.userbutton}
          >
            <UserButton appearance={{ elements: { avatarBox: styles.customavatarsize } }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NavBarDashboard
