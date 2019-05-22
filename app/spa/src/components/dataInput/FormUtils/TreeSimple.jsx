//  eslint no-console:0 */
// eslint no-alert:0 */
// eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React from 'react'
import PropTypes from 'prop-types'
import Tree /* , { TreeNode } */ from 'rc-tree'
import 'rc-tree/assets/index.css'
import styles from './Compo.module.scss'

// const treeData = [
//   {
//     key: '0-0',
//     title: 'parent 1',
// children: [{ key: '0-0-0', title: 'parent 1-1',
// children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
//  { key: '0-0-1', title: 'parent 1-2',
//  children: [{ key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
//   { key: '0-0-1-1', title: 'parent 1-2-1' }] }]
//   }
// ];

const Icon = ({ selected }) => {
  return (
    <span
      className={`${styles.tree_icon} ${selected && styles.tree_selected_icon}`}
    />
  )
}

// const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88' +
// '.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.' +
// '6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.'
// + '2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';
const getSvgIcon = (icon, iStyle = {}, style = {}) => {
  const st = {
    display: 'block',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'normal',
    width: '17px',
    height: '17px',
    ...iStyle
  }
  return (
    <i style={st}>
      {icon}
      {/* <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" style={{ verticalAlign: '-.125em', ...style }}>
        <path d={path} />
      </svg> */}
    </i>
  )
}

export default class TreeSimple extends React.Component {
  static propTypes = {
    keys: PropTypes.array
  }

  constructor(props) {
    super(props)
    // const keys = props.keys

    this.state = {
      // defaultExpandedKeys: keys,
      // defaultSelectedKeys: keys,
      // defaultCheckedKeys: keys
    }
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    this.selKey = info.node.props.eventKey
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
  }

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey)
    }, 0)
  }

  // onDel = e => {
  //   if (!window.confirm('sure to delete?')) {
  //     return
  //   }
  //   e.stopPropagation()
  // }

  render() {
    /* const customLabel = (
      <span className="cus-label">
        <span>operations: </span>
        <span style={{ color: 'blue' }} onClick={this.onEdit}>
          Edit
        </span>
        &nbsp;
        <label onClick={e => e.stopPropagation()}>
          <input type="checkbox" /> checked
        </label>
        &nbsp;
        <span style={{ color: '#EB0000' }} onClick={this.onDel}>
          Delete
        </span>
      </span>
    ); */
    const { treeData, onSelect, ...otherProps } = this.props
    const switcherIcon = obj => {
      if (obj.isLeaf) {
        return getSvgIcon(
          '',
          { cursor: 'pointer', backgroundColor: 'white' },
          { transform: 'rotate(270deg)' }
        )
      }
      return getSvgIcon(
        obj.expanded ? '-' : '+',
        { cursor: 'pointer', backgroundColor: 'white' },
        { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
      )
    }
    return (
      <div>
        <Tree
          icon={Icon}
          treeData={treeData}
          onSelect={onSelect}
          switcherIcon={switcherIcon}
          {...otherProps}
        />
      </div>
    )
  }
}
