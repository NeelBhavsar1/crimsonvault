"use client"

import React, { useEffect, useState } from 'react'
import styles from './NavBarHome.module.css'
import Image from 'next/image'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NavBarHome = () => {
  const { user, isSignedIn } = useUser()
  const [mounted, setMounted] = useState(false)
  const { openSignIn } = useClerk()
  const [dbUser, setDbUser] = useState(null)
  const { theme, setTheme } = useTheme()  
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isSignedIn) return

    const fetchDbUser = async () => {
      try {
        const res = await fetch("/api/checkUser")
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setDbUser(data)
      } catch (error) {
        console.error("Error fetching the db user: ", error)
      }
    }
    fetchDbUser()
  }, [isSignedIn])

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/crimson.png"
          alt="crimson logo"
          width={100}
          height={100}
          className={styles.crimsonimage}
        />
        <p>Crimson<span>Vault</span></p>
      </div>

      <div className={styles.quicklinks}>
        <ul>
          <li>Home</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
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

        {user ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.userbutton}
          >
            <UserButton appearance={{ elements: { avatarBox: styles.customavatarsize } }} />
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.getstarted}
            onClick={() => openSignIn()}
          >
            Get Started
          </motion.button>
        )}

        <div className={styles.mobilemenuwrapper}>
          <motion.button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={styles.hamburger}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: easeInOut }}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
  {isMobileOpen && (
    <motion.div
      className={styles.mobilemenu}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, x: 40 }}
    >
      <ul>
        <li onClick={() => setIsMobileOpen(false)}>Home</li>
        <li onClick={() => setIsMobileOpen(false)}>About Us</li>
        <li onClick={() => setIsMobileOpen(false)}>Features</li>
        <li onClick={() => setIsMobileOpen(false)}>Contact</li>
      </ul>

      {user ? (
        <>
          <motion.button
            className={styles.mobilelogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/dashboard")
              setIsMobileOpen(false)
            }}
          >
            Dashboard
          </motion.button>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: styles.mobileAvatar
                }
              }}
            />
          </div>
        </>
      ) : (
        <motion.button
          className={styles.mobilelogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            openSignIn()
            setIsMobileOpen(false)
          }}
        >
          Get Started
        </motion.button>
      )}
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}

export default NavBarHome
