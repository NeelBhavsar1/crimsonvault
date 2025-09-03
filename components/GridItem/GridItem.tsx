import React from 'react'
import styles from './GridItem.module.css'
import Image from 'next/image'

interface GridItemProps {
    imagelink: string,
    name: string,
    description: string,
    onClick: () => void
}

const GridItem: React.FC<GridItemProps> = ({imagelink, name, description, onClick}) => {
  return (
    <div className={styles.container} onClick={onClick}>
        <div className={styles.header}>
            <Image src={imagelink} width={300} height={300} alt="image" className={styles.gridimage} />
            <p className={styles.headername}>{name}</p>
        </div>
        <div className={styles.body}>
            <p className={styles.description}>{description}</p>
        </div>
    </div>
  )
}

export default GridItem