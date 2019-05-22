import React from 'react'
import AppHeader from '@/components/pageUse/com/Header'
import AppFooter from '@/components/pageUse/com/Footer'
import { Layout, Content } from '@/components/layout'

const Home = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content>
        <h1>Home page</h1>
        <p>welcom ~</p>
      </Content>
      <AppFooter />
    </Layout>
  )
}

export { Home }
export default Home
