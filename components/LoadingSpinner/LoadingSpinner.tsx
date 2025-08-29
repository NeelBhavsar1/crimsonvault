"use client"

import React from 'react'
import stlyes from './Loadingspinner.module.css'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <motion.div
    className={stlyes.spinner}
    animate={{rotate: 360}}
    transition={{repeat: Infinity, duration: 1, ease: "linear"}}
    ></motion.div>
  )
}

export default LoadingSpinner