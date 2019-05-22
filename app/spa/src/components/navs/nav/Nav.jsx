import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ data, ...props }) => {
  return (
    <nav {...props}>
      <ul>
        {data.map(v => {
          return (
            <li key={v.id}>
              <NavLink exact to={v.to}>
                {v.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { Nav }
export default Nav
