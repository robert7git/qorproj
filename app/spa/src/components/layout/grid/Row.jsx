import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

export const Row = (props) => {
  const { gutter, children, className } = props;
  const cols = Children.map(children, (col) => {
    if (!col) {
      return null;
    }
    if (col.props && gutter > 0) {
      return cloneElement(col, {
        style: {
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
          ...col.props.style
        }
      });
    }
    return col;
  });
  const cls = `row ${className || ''}`;

  return (
    <div className={cls} style={{ marginLeft: -gutter / 2, marginRight: -gutter / 2 }}>
      {cols}
    </div>
  );
};

Row.defaultPropTypes = {
  gutter: 0
};

Row.propTypes = {
  children: PropTypes.node,
  gutter: PropTypes.number
};

export default Row;
