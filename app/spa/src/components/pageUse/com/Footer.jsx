import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout'
import styles from './Footer.module.scss'

const AppFooter = () => {
  return (
    <Footer className={styles.Footer}>
      &copy; robert
      <br />
      <Link to="/signin">登录</Link>
      <Link to="signup">注册</Link>
    </Footer>
  )
}

export { AppFooter }
export default AppFooter
