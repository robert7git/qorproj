import React from 'react'

const Content = ({ style, children }) => {
  const stl = style && style
  return (
    <main className="Content" style={stl}>
      {children}
    </main>
  )
}

export { Content }
export default Content
