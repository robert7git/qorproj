import React from 'react'

const Header = ({ children, className }) => {
  const cls = className || ''
  return <header className={`Header ${cls}`}>{children}</header>
}

export { Header }
export default Header
