import React from 'react'
import Select from 'rc-select'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'

// function onShowSizeChange(current, pageSize) {
//   console.log(current)
//   console.log(pageSize)
// }

// function onChange(current, pageSize) {
//   console.log('onChange:current=', current)
//   console.log('onChange:pageSize=', pageSize)
// }

export default ({
  current,
  total,
  pageSize,
  onChange,
  showQuickJumper,
  showSizeChanger,
  pageSizeOptions,
  onShowSizeChange,
  ...otherProps
}) => {
  const pagyProps = {
    showQuickJumper: showQuickJumper,
    selectComponentClass: Select,
    defaultPageSize: 20,
    defaultCurrent: 5,
    pageSizeOptions: pageSizeOptions,
    showSizeChanger: showSizeChanger,
    onShowSizeChange: onShowSizeChange,
    onChange: onChange,
    current: current,
    total: total,
    pageSize: pageSize,
    ...otherProps
  }

  return <Pagination {...pagyProps} />
}
// ReactDOM.render(
//   <Pagination
//     selectComponentClass={Select}
//     showQuickJumper
//     showSizeChanger
//     defaultPageSize={20}
//     defaultCurrent={5}
//     onShowSizeChange={onShowSizeChange}
//     onChange={onChange}
//     total={450}
//   />,
//   document.getElementById('__react-content')
// )
