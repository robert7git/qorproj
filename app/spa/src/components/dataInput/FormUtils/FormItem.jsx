import React from 'react'
import PropTypes from 'prop-types'
import style from './Compo.module.scss'
/**
 * FormItem Component
 */
export const FormItem = props => {
  return <div className={style.formItem}>{props.children}</div>
}

FormItem.propTypes = {
  children: PropTypes.node
}

export default FormItem
