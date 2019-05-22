import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ShopList.module.scss'

const ShopList = ({ data }) => {
  return (
    <ul className={styles.ShopList}>
      {data.map(v => {
        return (
          <li key={v.id}>
            <div>
              <Link to={`/shop/products/${v.id}`}>
                <img src={v.img} alt="" />
              </Link>
            </div>
            <div>
              <Link to={`/shop/products/${v.id}`}>{v.title}</Link>
            </div>
            <div>
              <span>{v.price}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { ShopList }
export default ShopList
