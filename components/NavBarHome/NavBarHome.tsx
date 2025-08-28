"use client"

import React, { useEffect, useState } from 'react'
import styles from './NavBarHome.module.css'
import Image from 'next/image'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NavBarHome = () => {
  const { user, isSignedIn } = useUser()
  const { openSignIn } = useClerk()
  const [dbUser, setDbUser] = useState(null)

  
  useEffect(() => {
    if (!isSignedIn) return;

    const fetchDbUser = async () => {
        try {
            const res = await fetch ("/api/checkUser")
            if (!res.ok) throw new Error("Failed to fetch user")
            const data = await res.json();
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
        <Image src="/crimson.png" alt='crimson logo' width={100} height={100} className={styles.crimsonimage}/>
        <p>Crimson<span>Vault</span></p>
      </div>

      <div className={styles.quicklinks}>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className={styles.actionbuttons}>
        <div>

        </div>
        <div>
            {user ? (
          <UserButton appearance={{ elements: { avatarBox: 'custom-avatar-size' } }} />
        ) : (
          <button className={styles.getstarted} onClick={() => openSignIn()}>
            Get Started
          </button>
        )}
        </div>
      </div>
    </div>
  )
}

export default NavBarHome
