import React, { useRef, useEffect, useMemo, useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	Updater,
	RowSelectionState,
} from '@tanstack/react-table';
import styles from './contactTable.module.scss';
import { ColumnTitle } from '../ColumnTitle/ColumnTitle';
import { Cell } from '../Cell/Cell';
import { LinkCell } from '../LinkCell/LinkCell';
import { PhoneCell } from '../PhoneCell/PhoneCell';
import { SaveCell } from '../SaveCell/SaveCell';
import { Error } from '../Error/Error';

import Cookies from 'js-cookie';

interface DataRow {
	uuid: string;
	name: string;
	link: string;
	phone?: string;
}

interface OwnedContact extends DataRow {
	ownerID?: string;
}

interface Data {
	data: DataRow[];
}

interface Columns {
	accessorKey: string;
	header: string;
	size: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cell: (props: any) => void;
}

export const ContactsTable = ({ data }: Data) => {
	const [tableWidth] = useState(768);
	const [rowSelection, setRowSelection] = useState({});
	const [response, setResponse] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const [rowsToSave, setRowsToSave] = useState<OwnedContact[]>([]);
	const containerRef = useRef(null);

	const id = Cookies.get('user')?.split('"')[1];

	const handleRowSelectionChange = (newSelection: Updater<RowSelectionState>) => {
		// Aktualizuj zaznaczenia w tabeli
		setRowSelection(newSelection);
	};

	const columns: Columns[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Nazwa firmy',
				size: (tableWidth - 20) / 4,
				cell: props => <Cell size={props.column.getSize()}>{props.getValue()}</Cell>,
			},
			{
				accessorKey: 'link',
				header: 'Profil w Google Maps',
				cell: props => <LinkCell size={props.column.getSize()} link={props.getValue()} />,
				size: (tableWidth - 20) / 4,
			},
			{
				accessorKey: 'phone',
				header: 'Telefon',
				size: (tableWidth - 20) / 4,
				cell: props => <PhoneCell size={props.column.getSize()}>{props.getValue()}</PhoneCell>,
			},
			{
				accessorKey: 'save',
				header: 'Zapisz (zaznacz wszystko)',
				cell: ({ row, column }) => (
					<SaveCell size={column.getSize()} checked={row.getIsSelected()} click={row.getToggleSelectedHandler()} />
				),
				size: (tableWidth - 20) / 4,
			},
		],
		[tableWidth]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange',
		enableRowSelection: true,
		getRowId: row => row.uuid,
		onRowSelectionChange: handleRowSelectionChange,
		state: {
			rowSelection: rowSelection,
		},
	});

	const onSave = async () => {
		if (rowsToSave.length > 0) {
			await fetch('https://scrapeact-api.vercel.app/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(rowsToSave),
			})
				.then(res => res.json())
				.then(async resJson => {
					setResponse(resJson);

					const status = response === 'Kontakty zostały zapisane' ? null : 'error';

					if (status === 'error') {
						console.log(response);
					}
				});
		} else {
			setErrorMsg('Musisz zaznaczyć kontakty, które chcesz zapisać');
		}
	};

	useEffect(() => {
		// Pobierz zaznaczone rzędy z tabeli
		const selectedRows = table.getSelectedRowModel().flatRows;

		// Zaktualizuj stan rowsToSave na podstawie zaznaczonych rzędów
		const updatedRowsToSave = selectedRows.map(row => ({ ...row.original, ownerID: id }));
		setRowsToSave(updatedRowsToSave);

		console.log(updatedRowsToSave);
	}, [rowSelection, id, table]);

	return (
		<div ref={containerRef} className={styles['table__container']}>
			<div className={styles['pagination__buttons']}>
				<button className={styles['pagination__button']} onClick={() => table.setPageIndex(0)}>
					Pierwsza strona
				</button>
				<button className={styles['pagination__button']} onClick={() => table.previousPage()}>
					Poprzednia strona
				</button>
				<button className={styles['pagination__button']} onClick={() => table.nextPage()}>
					Następna strona
				</button>
				<button className={styles['pagination__button']} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
					Ostatnia strona
				</button>
			</div>
			<table className={styles.table}>
				<thead>
					{table.getHeaderGroups().map(group => (
						<tr className={styles['table__header']} key={group.id}>
							{group.headers.map(header => {
								const clickHandler = () => {
									if (header.id === 'save') {
										return table.toggleAllRowsSelected();
									}
									return;
								};

								return (
									<ColumnTitle id={header.id} onClick={clickHandler} size={header.getSize()} key={header.id}>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</ColumnTitle>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<React.Fragment key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles['save__container']}>
				<button onClick={onSave} className={styles['save__button']}>
					Zapisz
				</button>
			</div>
			{errorMsg.length !== 0 && <Error message={errorMsg} />}
		</div>
	);
};
