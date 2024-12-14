import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterInput from './FilterInput'; // Adjust the import as needed

describe('FilterInput', () => {

  it('calls onDropdownChange when the dropdown value changes', () => {
    const onDropdownChange = jest.fn();
    const { getByRole } = render(<FilterInput onInputChange={() => {}} onDropdownChange={onDropdownChange} />);
    
    const dropdown = getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'January' } });
    
    expect(onDropdownChange).toHaveBeenCalledWith('January');
  });
});
