/* eslint-disable */
import React from 'react';
import style from './Compo.module.scss';
import { FormItem } from './FormItem';

export { FormItem };

/**
 * Label Component
 */
export const Label = props => {
  return <label className={style.label}>{props.children}</label>;
};

/**
 * TextArea Component
 */
export const Textarea = props => {
  const { value, placeholder, type, size, className, onChange, cols, rows, ref} = props;
  const extraCls = className ? style.className : ""
  const cls = `${style.textarea} ${style[size || 'md']}`

  return (
      <textarea
        ref={ref}
        className={`${cls} ${extraCls}`}
        value={value}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
      />
  );
};

export const Select = props => {
  const { input, selects } = props;
  return (
    <React.Fragment>
      <select className={style.select} {...input}>
        {selects.map((item, i) => (
          <option key={i} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

// export const Radio = ({ input, label, type, meta: { touched, error, warning } }) => (
// 	<div className={ touched && error ? 'has-error form-group' : 'form-group' }>
// 		<div className="input-group">
// 			<span className="input-group-addon">{ label }</span>
// 			<input { ...input } placeholder={ label } type={ type } className="form-control" />
// 		</div>
// 		{ touched &&
// 			((error && <div className="help-block with-errors">{ error }</div>) ||
// 				(warning && <div className="help-block with-errors">{ warning }</div>)) }
// 	</div>
// )
