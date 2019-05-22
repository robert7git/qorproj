import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import fetch from 'isomorphic-fetch';
import { noteClosable } from '@/components/feedBack/notifiction'

import { UploadFile } from './FileUpload/UploadFile'
import styles from './Uploader.module.scss'

// function uploadDeleteRequest({ action, filename, fileext, pathname }) {
//   const url = `${action}/?filename=${filename}&pathname=${pathname}&fileext=${fileext}`;
//   let request = new Request(url, {
//     method: 'DELETE',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     })
//   });
//   return fetch(request).then(response => response.json());
// }

class Uploader extends Component {
  beforeUpload = file => {
    console.log('beforeUpload', file)
  }

  onSuccess = res => {
    const { Xmultiple, input } = this.props
    if (Xmultiple === true) {
      // NOTE: 这里注意 对象的层次 深拷贝
      const newValue = Array.prototype.slice.call(input.value, 0)
      if (res.data) {
        newValue.push({
          id: res.data.id,
          path: res.data.path,
          status: res.data.status
        })
        this.props.onChange(newValue)
      }
    } else {
      this.props.onChange(res.data.path)
    }
    // alert('上传成功')
    noteClosable('上传成功!')
  }

  onProgress = e => {
    console.log(e.percent)
    // console.log('------------- onProgress', Math.round(step.percent), file.name)
  }

  onError = (err, response, xhr) => {
    noteClosable(`上传失败! ${err.status} ${response.msg}`)
  }

  handleDelete = () => {
    const { onChange } = this.props
    // const { input } = props;
    // const file = input.value.split('.');
    onChange('')

    // uploadDeleteRequest({
    //   action: props.action,
    //   pathname: props.name,
    //   filename: file[0],
    //   fileext: file[1]
    // }).then(json => {
    //   if (json.status.code === -1) {
    //     throw new Error(`${json.status.msg}`);
    //   }
    //   props.onChange('');
    //   return json.data;
    // });
  }

  renderPreviews = () => {
    const { thumUrlPrefix, Xmultiple, input } = this.props

    if (input.value) {
      if (Xmultiple === true) {
        return (
          <ul className={styles.uploaderPreview}>
            {input.value.map((v, i) => {
              const key = `pictures_${i}`
              return (
                <li key={key}>
                  <img src={`${thumUrlPrefix}/260x/${v.path}`} alt="" />
                  <i onClick={this.handleDelete}>x</i>
                </li>
              )
            })}
          </ul>
        )
      }
      return (
        <ul className={styles.uploaderPreview}>
          <li>
            <img src={`${thumUrlPrefix}/300x/${input.value}`} alt="" />
            <i onClick={this.handleDelete}>x</i>
          </li>
        </ul>
      )
    }

    return false
  }

  renderUpload = () => {
    const {
      input,
      Xmultiple,
      name,
      placeholder,
      action,
      headers
      // thumUrlPrefix
      // label,
      // type,
      // action,
      // multiple,
    } = this.props

    const uploadProps = {
      name,
      placeholder,
      action,
      headers,
      className: 'uploaderFileInput',
      // multiple: props.multiple,
      multiple: false,
      beforeUpload: this.beforeUpload,
      onStart: this.beforeUpload,
      onSuccess: this.onSuccess,
      onProgress: this.onProgress,
      onError: this.onError
      // customRequest: this.customRequest
    }

    if (Xmultiple === true) {
      return <UploadFile {...uploadProps} />
    }

    if (!input.value) {
      return <UploadFile {...uploadProps} />
    }
    return false
  }

  render() {
    console.log('----------------------------------------------------------')
    console.log(this.props.input)
    return (
      <div className={styles.uploader}>
        {this.renderPreviews()}
        {this.renderUpload()}
      </div>
    )
  }
}

Uploader.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  name: PropTypes.string,
  thumUrlPrefix: PropTypes.string,
  meta: PropTypes.object,
  Xmultiple: PropTypes.bool
}

export { Uploader }
export default Uploader
