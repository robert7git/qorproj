import React from 'react'

const Footer = ({ children, className }) => {
  const cls = className || ''
  return <footer className={`Footer ${cls}`}>{children}</footer>
}

export { Footer }
export default Footer
