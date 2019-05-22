import React from 'react'
import Table from 'rc-table'
import Pagination from '@/components/navs/pagination'
import { Loading } from '@/components/feedBack/loading'

import 'rc-table/assets/index.css'

export default ({
  data,
  columns,
  loading,
  scroll,
  style,
  pagination,
  onChange,
  onShowSizeChange,
  rowKey,
  defaultExpandAllRows,
  ...otherProps
}) => {
  const tableProps = {
    style: style || null,
    scroll: scroll || { x: true },
    defaultExpandAllRows: defaultExpandAllRows || true,
    loading: loading || false,
    columns: columns,
    rowKey: rowKey || 'key',
    data: data || []
    // ...otherProps
  }

  const pagyProps = {
    // defaultPageSize: 20,
    // defaultCurrent: 5,
    // showQuickJumper: true,
    // selectComponentClass: Select,
    // onShowSizeChange: onShowSizeChange,
    onShowSizeChange: onShowSizeChange,
    onChange: onChange,
    ...pagination
    // ...otherProps
  }
  return (
    <>
      {loading && <Loading />}
      <Table {...tableProps} {...otherProps} />
      {pagination && <Pagination {...pagyProps} />}
    </>
  )
}
