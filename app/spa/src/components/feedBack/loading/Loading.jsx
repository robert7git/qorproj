import React from 'react'
import LoadingStyle from './Loading.module.scss'

export const Loading = ({ loading }) => {
  return (
    <div className={`${LoadingStyle.LoadingMask}`}>
      <div className={LoadingStyle.Loading}>正在加载...</div>
    </div>
  )
}
