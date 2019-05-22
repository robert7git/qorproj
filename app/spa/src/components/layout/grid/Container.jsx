import React from 'react'
// import styles from './Container.module.scss'

export const Container = ({ type, size, className, style, children }) => {
  let cls = type && type === 'full' ? 'containerFull' : 'container'
  cls += ` container_${size} `
  cls += className ? ` ${className}` : ''
  return (
    <div className={`${cls}`} style={style}>
      {children}
    </div>
  )
}

export default Container
