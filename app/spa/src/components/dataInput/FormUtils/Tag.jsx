import React from 'react'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css'

// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(
//     <Option key={i.toString(36) + i} test={i}>
//       {i.toString(36) + i}
//     </Option>
//   );
// }

class Tag extends React.Component {
  // state = {
  //   // disabled: false,
  //   // value: ['name2', 'name3'],
  //   // inputvalue: { name: '' }
  // };

  onChange = (value, option) => {
    console.log(`changed ${value}`, option)
    // debugger;
    const values = option.map(v => {
      if (v.props.id) {
        return { id: v.props.id, name: v.props.value }
      }
      return { name: v.props.value }
    })
    // this.setState({
    //   value
    // });
    this.props.input.onChange(values)
  }

  onSelect = (value, option) => {
    console.log(`selected ${value}`, option.props)
    // const values =option.map(v=>v.props.id)
    // this.props.input.onChange(value);
  }

  // onDeselect = (value, option) => {
  //   console.log(`deselected ${value}`, option);
  // };

  // toggleMaxTagCount = count => {
  //   this.setState({
  //     maxTagCount: count
  //   });
  // };
  onBlur = () => {}

  render() {
    const {
      input,
      options,
      placeholder /* tagsList */,
      ...otherProps
    } = this.props
    const value = input.value && input.value.map(v => v.name)
    const selectProps = {
      value,
      placeholder,
      tags: true,
      dropdownMenuStyle: { maxHeight: 200 },
      style: { width: 500 },
      // disabled: this.state.disabled,
      maxTagCount: 5,
      maxTagTextLength: 10,
      ...otherProps,
      onChange: this.onChange,
      onSelect: this.onSelect,
      tokenSeparators: [' ', ','],
      onFocus: () => console.log('focus'),
      onBlur: this.onBlur
    }
    return (
      <div>
        <Select {...selectProps}>
          {options &&
            Object.keys(options).map((k, i) => {
              return (
                <Option
                  key={`${options[k].id}`}
                  value={`${options[k].name}`}
                  id={`${options[k].id}`}
                  name={`${options[k].name}`}
                >
                  {options[k].name}
                </Option>
              )
            })}
        </Select>
      </div>
    )
  }
}

export { Tag }
export default Tag
