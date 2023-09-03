import React from 'react';
import PropTypes from 'prop-types';
export const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <label>Filter contacts by name:</label>
      <input type="text" value={filter} onChange={onChange} />
    </div>
  );
};
Filter.propTypes={
  filter: PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
}
export default Filter;
