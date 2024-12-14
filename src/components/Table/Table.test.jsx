import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table'; // Adjust the import as needed
import TableRow from '../TableRow/TableRow';

jest.mock('../TableRow/TableRow', () => () => <tr></tr>); // Mock TableRow component

describe('Table', () => {
  const columns = ['username', 'transactionAmount'];
  const data = [
    { username: 'john_doe', transactionAmount: 100 },
    { username: 'jane_doe', transactionAmount: 150 }
  ];

  it('renders column headers correctly', () => {
    const { getByText } = render(<Table columns={columns} data={data} />);
    
    expect(getByText('username')).toBeInTheDocument();
    expect(getByText('transactionAmount')).toBeInTheDocument();
  });


  it('renders "No Data Available" when no data is provided', () => {
    const { getByText } = render(<Table columns={columns} data={[]} />);
    
    expect(getByText('No Data Available')).toBeInTheDocument();
  });
});
