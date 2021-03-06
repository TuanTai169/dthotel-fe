import React, { useState, useMemo } from 'react';
import { ButtonToolbar, Form, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReceiptItem from './ReceiptItem';

import TableHeader from '../../../components/Common/table/TableHeader';
import Search from '../../../components/Common/Search';
import FullLoading from '../../../components/Common/FullLoading';
import PaginationComponent from './../../../components/Common/Pagination';

function Receipt() {
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(6);
	const [sorting, setSorting] = useState({ field: '', order: '' });
	const [search, setSearch] = useState('');

	//Get all Receipt
	const receipts = useSelector((state) => state.receiptReducer.receipts);
	const isLoading = useSelector((state) => state.receiptReducer.isReceiptLoading);

	//Header table
	const headers = [
		{ name: 'No#', field: 'id', sortable: false },
		{ name: 'Name', field: 'name', sortable: false },
		{ name: 'Email', field: 'email', sortable: false },
		{ name: 'Phone', field: 'phone', sortable: false },
		{ name: 'Booking Code', field: 'code', sortable: false },
		{ name: 'Action', field: 'action', sortable: false },
	];

	const currentData = useMemo(() => {
		let computedReceipts = [...receipts];

		if (search) {
			computedReceipts = computedReceipts.filter(
				(comment) =>
					comment.booking.detail.customer.name.toLowerCase().includes(search.toLowerCase()) ||
					comment.booking.detail.customer.email.toLowerCase().includes(search.toLowerCase()) ||
					comment.booking.detail.code.toLowerCase().includes(search.toLowerCase())
			);
		}
		setTotalItems(computedReceipts.length);

		//Sorting comments
		if (sorting.field) {
			computedReceipts.sort((a, b) => {
				if (a[sorting.field] < b[sorting.field]) {
					return sorting.order === 'ascending' ? -1 : 1;
				}
				if (a[sorting.field] > b[sorting.field]) {
					return sorting.order === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}

		const indexOfLastNews = currentPage * limit;
		const indexOfFirstNews = indexOfLastNews - limit;
		return computedReceipts.slice(indexOfFirstNews, indexOfLastNews);
	}, [receipts, currentPage, limit, sorting, search]);

	return (
		<div>
			<>
				{isLoading ? (
					<FullLoading />
				) : (
					<div className='page'>
						<div className='page__header'>
							<div className='page__title'>
								<h3>Receipts</h3>
							</div>
							<div className='page__search'>
								<Search
									onSearch={(value) => {
										setSearch(value);
										setCurrentPage(1);
									}}
								/>
							</div>
							<div className='page__action'>
								<ButtonToolbar>
									{/* <Button
                    variant="success"
                    className={roles === "EMPLOYEE" ? "disabled" : ""}
                    onClick={() => setIsOpen(true)}
                  >
                    Add Receipts
                  </Button> */}
								</ButtonToolbar>
							</div>
						</div>
						<div className='page__body'>
							<Table striped>
								<TableHeader
									headers={headers}
									onSorting={(field, order) => setSorting({ field, order })}
								/>
								<tbody>
									{currentData.map((receipt, index) => (
										<tr key={receipt._id}>
											<td>{index + 1 + (currentPage - 1) * limit}</td>
											<ReceiptItem receipt={receipt} />
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<div className='page__footer'>
							<div className='page__select'>
								<Form.Select
									name='limit'
									defaultValue={limit}
									onChange={(e) => setLimit(e.target.value)}
								>
									<option value='6'>6</option>
									<option value='8'>8</option>
									<option value='10'>10</option>
								</Form.Select>
							</div>
							<div className='page__sumOfRecord'>
								<h6>Total number of records: {totalItems} </h6>
							</div>
							<div className='page__pagination'>
								<PaginationComponent
									total={totalItems}
									itemsPerPage={limit}
									onPageChange={(page) => setCurrentPage(page)}
									currentPage={currentPage}
								/>
							</div>
						</div>
					</div>
				)}
			</>
		</div>
	);
}

export default Receipt;
