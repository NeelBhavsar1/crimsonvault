"use client"

import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.logoandfollow}>
                <div className={styles.logo}>
                    <Image src="/crimson.png" alt='crimson logo' width={100} height={100} className={styles.crimsonlogo} />
                    <p>Crimson<span>Vault</span></p>
                </div>
                <p>Crimson<span>Vault</span> - Secure your finances with AI-powered protection</p>
                <div className={styles.followbtns}>
                    <Image src="/linkedin.png" width={100} height={100} alt='linkedin' className={styles.btnlogo} onClick={() => window.open("https://www.linkedin.com/in/neel-bhavsar-767532238/" , "_blank")}/>
                    <Image src="/github.png" width={100} height={100} alt='linkedin' className={styles.btnlogo} onClick={() => window.open("https://github.com/NeelBhavsar1?tab=repositories" , "_blank")}/>
                </div>
            </div>

            <div className={styles.companylinks}>
                <p>Company Links</p>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Features</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>

            <div className={styles.companyresources}>
                <p>Resources</p>
                <div>
                    <ul>
                        <li>Docs</li>
                        <li>Blog</li>
                        <li>API Reference</li>
                        <li>FAQ</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={styles.cnpfooter}>
            <p>&copy;{new Date().getFullYear()} Neel Bhavsar. All Rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer