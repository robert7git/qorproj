import 'rc-switch/assets/index.css'
import React from 'react'
import Switch from 'rc-switch'

// export class OnOff extends React.Component {
// constructor(props) {
//   super();
//   this.state = {
//     // disabled: false,
//     disabled: false
//   };
//   // this.toggle = this.toggle.bind(this);
//   // this.onChange = this.onChange.bind(this);
// }

// componentWillReceiveProps(nextProps) {
//   // const disabled = nextProps.value !== 1 ? true : false;
//   // this.setState({ disabled });
// }

// toggle() {
//   this.setState({
//     disabled: !this.state.disabled
//   });
// }

// onChange(value) {
//   console.log(`switch checked: ${value}`); // eslint-disable-line
// }
const OnOff = props => {
  const {
    /* type, size, className, onChange, placeholder, */ onChange,
    value
  } = props
  // console.log(this.props);
  const checked = value === true
  // return <Switch onChange={this.onChange} disabled={this.state.disabled} checkedChildren={'开'} unCheckedChildren={'关'} />;
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedChildren="开"
      unCheckedChildren="关"
    />
  )
}
// }

export { OnOff }
export default OnOff
