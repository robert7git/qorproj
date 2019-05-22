/* eslint no-console: 0 */

import React from 'react'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css'

class SingleSelect extends React.Component {
  state = {
    destroy: false
    // value: 9
  }

  onChange = e => {
    let value
    if (e && e.target) {
      value = e.target.value
    } else {
      value = e
    }
    console.log('onChange', value)
    // this.setState({
    //   value
    // });
    this.props.input.onChange(value)
  }

  onDestroy = () => {
    // this.props.input.onChange(value)
    this.setState({
      destroy: 1
    })
  }

  onBlur = v => {
    console.log('onBlur', v)
  }

  onFocus = () => {
    console.log('onFocus')
  }

  render() {
    const { input, options, ...otherProps } = this.props

    if (this.state.destroy) {
      return null
    }
    return (
      <div style={{ width: 300 }}>
        <Select
          defaultValue="请选择"
          id="my-select"
          value={input.value}
          placeholder="placeholder"
          dropdownMenuStyle={{ maxHeight: 200 }}
          style={{ width: 500 }}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          optionLabelProp="children"
          optionFilterProp="text"
          onChange={this.onChange}
          // allowClear
          // firstActiveValue="2"
          // backfill
          {...otherProps}
        >
          {Object.keys(options).map((opt, i) => {
            return (
              <Option value={options[opt].id} key={`${options[opt].id}`}>
                {options[opt].name}
              </Option>
            )
          })}
          {/* <Option value="01" text="jack" title="jack">
            <b
              style={{
                color: 'red'
              }}>
              jack
            </b>
          </Option>
          <Option value="11" text="lucy">
            lucy
          </Option>
          <Option value="21" disabled text="disabled">
            disabled
          </Option>
          <Option value="31" text="yiminghe">
            yiminghe
          </Option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <Option key={i} value={i} text={String(i)}>
                {i}-text
              </Option>
            );
          })} */}
        </Select>
      </div>
    )
  }
}


export { SingleSelect }
export default SingleSelect
