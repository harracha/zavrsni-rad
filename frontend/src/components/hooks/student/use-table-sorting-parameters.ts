import { useState } from 'react';

export type sortOptions = 'make' | 'price' | 'createdAt';
export type sortDirection = 'asc' | 'desc';
export type possibleItemsPerPage = '10' | '20' | '50';
export const useTableSortingParameters = () => {
	const [pageNum, setPageNum] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<possibleItemsPerPage>('10');
	const [orderBy, setOrderBy] = useState<sortOptions>('createdAt');
	const [direction, setDirection] = useState<sortDirection>('desc');

	return {
		pageNum,
		orderBy,
		direction,
		setPageNum,
		setOrderBy,
		setDirection,
		itemsPerPage,
		setItemsPerPage
	};
};
