/*-----------------------------------------------------------------------------
 * @Author: Robert.Xu Guonan
 * @Date: 2018-11-14 18:38:35
 * @Last modified by:   Robert.Xu Guonan
 * @Last modified time: 2018-11-14 18:38:35
 -----------------------------------------------------------------------------*/

import React from 'react'
import { Uploader } from './Uploader'
import { OnOff } from './OnOff'
import { FormItem } from './FormItem'
import { Input } from './Input'
import { Tag } from './Tag'
import { SingleSelect } from './SingleSelect'
import { Textarea } from './Textarea'
import InputNumber from './InputNumber'
// import Editor from './Editor'
import TreeSimple from './TreeSimple'

import style from './Compo.module.scss'

const HOCRX = WrappedComponent => props => {
  const {
    input,
    label,
    meta: { touched, error, warning }
    // type,
  } = props

  // console.log('--------------------------HOCRX--------------------------------')
  // console.log(props.input)
  return (
    <FormItem>
      {/* <label className={style.label} for=""> */}
      <span>{label}</span>
      {/* </label> */}
      <WrappedComponent {...props} {...input} />
      <p>
        {touched &&
          ((error && <span className={style.error}>{error}</span>) ||
            (warning && <span className={style.warning}>{warning}</span>))}
      </p>
    </FormItem>
  )
}

const TagRX = HOCRX(Tag)
const OnOffRX = HOCRX(OnOff)
const InputRX = HOCRX(Input)
const SingleSelectRX = HOCRX(SingleSelect)
const TextAreaRX = HOCRX(Textarea)
const UploaderRX = HOCRX(Uploader)
const InputNumberRX = HOCRX(InputNumber)
// const EditorrRX = HOCRX(Editor)
export {
  FormItem,
  Input,
  Textarea,
  OnOff,
  Tag,
  Uploader,
  SingleSelect,
  InputNumber,
  // Editor,
  TreeSimple
}
export {
  InputRX,
  TextAreaRX,
  OnOffRX,
  TagRX,
  UploaderRX,
  SingleSelectRX,
  InputNumberRX /* EditorrRX */
}
