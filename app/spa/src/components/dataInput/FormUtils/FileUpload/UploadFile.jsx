/* eslint no-console:0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from 'rc-upload'
import styles from './UploadFile.module.scss'


class UploadFile extends Component {
  constructor() {
    super()
    this.state = {
      destroyed: false
    }
  }

  destroy = () => {
    this.setState({
      destroyed: true
    })
  }

  render() {
    const props = this.props
    const state = this.state
    const {
      headers,
      style,
      className,
      action,
      name,
      multiple,
      ...otherProps /* beforeUpload, onSuccess, onProgress, onError, customRequest */
    } = props
    // const { headers, ...otherprops } = props;
    const uploaderProps = {
      // data: { a: 1, b: 2 },
      headers,
      style,
      className,
      action,
      name,
      multiple,
      ...otherProps,
      // beforeUpload,
      // onSuccess,
      // onProgress,
      // onError,
      // customRequest,
      component: 'div'
    }
    if (state.destroyed) {
      return null
    }
    return (
      <Upload
        {...uploaderProps}
        ref={c => {
          this.innerRef = c
        }}
      >
        <i className={`fa fa-picture-o ${styles.ico}`} />
        {/* <span className={styles.placeholder}>{props.placeholder}</span> */}
      </Upload>
    )
  }
}

UploadFile.propTypes = {
  action: PropTypes.string,
  name: PropTypes.string,
  onSuccess: PropTypes.func,
  multiple: PropTypes.bool,
  beforeUpload: PropTypes.func,
  onStart: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  headers: PropTypes.objectOf({ Authorization: PropTypes.string })
  // input: PropTypes.object,
}

export { UploadFile }
export default UploadFile
