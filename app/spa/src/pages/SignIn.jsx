import React from 'react'
import { Link } from 'react-router-dom'

import { Btn } from '@/components/com/btn'

import AppHeader from '@/components/pageUse/com/Header'
import AppFooter from '@/components/pageUse/com/Footer'
import { Layout, Content } from '@/components/layout'
import { Row, Col, Container } from '@/components/layout/grid'
import { Input } from '@/components/dataInput/FormUtils'

const ContainerStyle = {
  maxWidth: '380px',
  backgroundColor: '#fff',
  padding: '38px'
}
const InputItemStyleRoundTop = {
  borderRadius: '4px 4px 0 0',
  borderBottom: '0'
}
const InputItemStyleRoundBottom = {
  borderRadius: '0 0 4px 4px',
  marginBottom: '16px'
}

const SignIn = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content>
        <Container size="md" style={ContainerStyle}>
          <div>
            <Row>
              <Col>
                <h1>登录</h1>
                <form>
                  <Input type="text" block size="md" placeholder="用户名" style={InputItemStyleRoundTop} />
                  <Input type="text" block size="md" placeholder="密码" style={InputItemStyleRoundBottom} />
                  <Btn type="submit" block level="primary" size="md">
                    登录
                  </Btn>
                </form>
                <p>
                  还没有账号? <Link to="/signup">去注册</Link>
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </Content>
      <AppFooter />
    </Layout>
  )
}

export { SignIn }
export default SignIn
