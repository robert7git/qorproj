import React from 'react'
import PropTypes from 'prop-types'

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Btn } from 'components/Btn'
import style from './style.scss'
import { noteClosable } from 'components/Notifiction'
import { Token } from 'utils/accessToken'

import { CONF } from 'config/conf'
const URL_UPLOADS = `${CONF.URL_UPLOADS}`
const API_UPLOADS = `${CONF.API_UPLOADS}?filekey=bodyfile`
// TODO: image decorator 分离 文件名与 存储路径
// ex: <img src="https://data.cmswing.com/upload_acb9171a79700d2f7d46dbeeca52b498.jpg?imageView2/1/w/110/h/10">
const uploadFn = param => {
  // const serverURL = API_UPLOADS;
  const xhr = new XMLHttpRequest()
  const fd = new FormData()
  // debugger;

  // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
  const successFn = response => {
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
    // const imgurl = `${URL_UPLOADS}/crops/xxlg/${JSON.parse(xhr.responseText).data}`;
    const repData = JSON.parse(xhr.responseText).data
    const imgPath = repData.path // 返回数据的 文件地址
    const imgurl = `${URL_UPLOADS}/800x/${imgPath}` // 资源地址拼接
    param.success({
      url: imgurl,
      meta: {
        id: `img_${imgurl}`,
        alt: imgurl,
        // title: 'xxx',
        // loop: true, // 指定音视频是否循环播放
        // autoPlay: true, // 指定音视频是否自动播放
        // controls: true, // 指定音视频是否显示控制栏
        src: imgurl // 指定视频播放器的封面
      }
    })
  }
  const progressFn = event => {
    // 上传进度发生变化时调用param.progress
    param.progress((event.loaded / event.total) * 100)
  }

  const errorFn = (/* response */) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.'
    })
  }

  xhr.upload.addEventListener('progress', progressFn, false)
  xhr.addEventListener('load', successFn, false)
  xhr.addEventListener('error', errorFn, false)
  xhr.addEventListener('abort', errorFn, false)

  fd.append('bodyfile', param.file)
  xhr.open('POST', API_UPLOADS, true)
  // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('x-access-token', Token.load())
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send(fd)
}

export class Editor extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  }

  componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent();
    const htmlContent = this.props.input.value
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })
  }
  componentWillReceiveProps(nextProps) {
    const htmlContent = nextProps.input.value
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })
  }

  render() {
    const { /*  input, */ placeholder, contentStyle } = this.props
    // debugger;
    const editorProps = {
      height: 200,
      // contentFormat: 'html',
      // initialContent: '<p>Hello World!</p>',
      // initialContent: input.value,
      value: this.state.editorState,
      placeholder: placeholder,
      onChange: this.handleEditorChange,
      onRawChange: this.handleRawChange,
      contentStyle: contentStyle ? contentStyle : { height: 'auto', minHeight: 150 },

      // fontFamilies:[],
      controls: [
        'undo',
        'redo',
        'split',
        // 'font-size',
        // 'font-family',
        // 'line-height',
        // 'letter-spacing',
        // 'indent',
        'text-color',
        'bold',
        'italic',
        'underline',
        'strike-through',

        // 'superscript',
        // 'subscript',
        'remove-styles',
        'emoji',
        'text-align',
        'split',
        'headings',

        'list-ul',
        'list-ol',

        'blockquote',
        'code',
        'split',
        'link',
        'split',
        'media'
        // 'hr',
        // 'split',
        // 'clear'
      ],
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        // video: true, // 开启视频插入功能
        // audio: true, // 开启音频插入功能
        // validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn // 指定上传函数，说明见下文
        // removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
        // onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        // onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        // onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
      },
      onSave: this.submitContent
    }

    return (
      <div className={style.root}>
        <BraftEditor {...editorProps} />
        <p className="mt1">
          <Btn onClick={this.submitContent}>保存内容</Btn>
        </p>
      </div>
    )
  }

  // handleChange = content => {
  //   console.log(111, content);
  //   this.props.onChange(content);
  // };
  handleEditorChange = editorState => {
    this.setState({ editorState })
  }
  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    // const result = await this.props.saveEditorContent(htmlContent);
    this.props.input.onChange(htmlContent)
    noteClosable('保存成功')
  }
  // handleRawChange = rawContent => {
  //   console.log(222, rawContent);
  // };
}

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Editor
