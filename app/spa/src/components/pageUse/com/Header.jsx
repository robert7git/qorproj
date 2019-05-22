import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import styles from './Header.module.scss'
import { Nav } from '@/components/navs/nav'
import { Header } from '@/components/layout'

const DataNav = [{ id: 0, name: '首页', to: '/' }, { id: 1, name: '页面商店', to: '/shop/products' }]

const AppHeader = ({ children }) => {
  return (
    <Header className={styles.Header}>
      <Link className={styles.logo} to="/">
        小鱼
      </Link>
      <p className={styles.slogan}>游哇游~</p>
      <Nav className={styles.nav} data={DataNav} />
      <div className={styles.user}>
        <span className="mr1">root</span>
        <NavLink to="/my" className="mr1">
          管理我的站点
        </NavLink>
        <NavLink to="/admin" className="mr1">
          超级管理员
        </NavLink>
        <a>退出</a>
      </div>
    </Header>
  )
}

export { AppHeader }
export default AppHeader
