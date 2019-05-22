import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Private = ({ path, component }) => {
  // const hasValidToken = ''
  // if (hasValidToken) {
    return <Route path={path} component={component} />
  // }
  // return (
  //   <Redirect
  //     to={{
  //       pathname: '/signin/'
  //     }}
  //   />
  // )
}
// state: { from: props.location }
export { Private }
export default Private
