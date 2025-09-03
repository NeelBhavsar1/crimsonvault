"use client"
import { useEffect, useRef } from "react"
import type React from "react"

import styles from './AnimatedBackground.module.css'

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const random = (min: number, max: number) => Math.random() * (max - min) + min
    const createElements = (containerClass: string, count: number, createFn: (index: number) => HTMLDivElement) => {
      const container = containerRef.current?.querySelector(`.${containerClass}`)
      if (!container) return
      for (let i = 0; i < count; i++) {
        const element = createFn(i)
        container.appendChild(element)
      }
    }

    createElements(styles.particlesContainer, 25, () => {
      const el = document.createElement("div")
      el.className = styles.particle
      el.style.left = `${random(0, 100)}%`
      el.style.top = `${random(0, 100)}%`
      const size = `${random(3, 8)}px`
      el.style.width = size
      el.style.height = size
      el.style.animationDelay = `${random(0, 6)}s`
      el.style.animationDuration = `${random(6, 12)}s`
      return el
    })

    createElements(styles.diagonalBoxesContainer, 12, () => {
      const el = document.createElement("div")
      el.className = styles.diagonalBox
      el.style.left = `${random(-10, 110)}%`
      el.style.top = `${random(-10, 110)}%`
      const size = `${random(30, 80)}px`
      el.style.width = size
      el.style.height = size
      el.style.animationDelay = `${random(0, 15)}s`
      el.style.animationDuration = `${random(15, 30)}s`
      return el
    })

    createElements(styles.floatingOrbs, 8, () => {
      const el = document.createElement("div")
      el.className = styles.floatingOrb
      el.style.left = `${random(0, 100)}%`
      el.style.top = `${random(0, 100)}%`
      el.style.animationDelay = `${random(0, 10)}s`
      el.style.animationDuration = `${random(8, 15)}s`
      return el
    })

    createElements(styles.spiralLines, 6, () => {
      const el = document.createElement("div")
      el.className = styles.spiralLine
      el.style.left = `${random(0, 100)}%`
      el.style.top = `${random(0, 100)}%`
      el.style.animationDelay = `${random(0, 8)}s`
      el.style.animationDuration = `${random(8, 16)}s`
      return el
    })

    createElements(styles.neuralNetwork, 15, () => {
      const el = document.createElement("div")
      el.className = styles.neuralConnection
      const x1 = random(0, 100)
      const y1 = random(0, 100)
      const x2 = random(0, 100)
      const y2 = random(0, 100)
      const length = Math.hypot(x2 - x1, y2 - y1)
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
      el.style.left = `${x1}%`
      el.style.top = `${y1}%`
      el.style.width = `${length}%`
      el.style.transform = `rotate(${angle}deg)`
      el.style.animationDelay = `${random(0, 3)}s`
      el.style.animationDuration = `${random(3, 6)}s`
      return el
    })

    createElements(styles.sparkles, 20, () => {
      const el = document.createElement("div")
      el.className = styles.sparkle
      el.style.left = `${random(0, 100)}%`
      el.style.top = `${random(0, 100)}%`
      el.style.animationDelay = `${random(0, 2)}s`
      el.style.animationDuration = `${random(2, 4)}s`
      return el
    })

    return () => {
      const containers = containerRef.current?.querySelectorAll(
        `.${styles.particlesContainer}, .${styles.diagonalBoxesContainer}, .${styles.floatingOrbs}, .${styles.spiralLines}, .${styles.neuralNetwork}, .${styles.sparkles}`,
      )
      containers?.forEach((container) => {
        container.innerHTML = ""
      })
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.animatedBackground}>
      <div className={styles.particlesContainer}></div>
      <div className={styles.diagonalBoxesContainer}></div>
      <div className={styles.floatingOrbs}></div>
      <div className={styles.spiralLines}></div>
      <div className={styles.gradientWaves}>
        <div className={styles.wave1}></div>
        <div className={styles.wave2}></div>
        <div className={styles.wave3}></div>
      </div>
      <div className={styles.neuralNetwork}></div>
      <div className={styles.sparkles}></div>
    </div>
  )
}

export default AnimatedBackground
