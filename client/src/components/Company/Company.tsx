import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Contact } from "../../types/Contact";
import styles from './company.module.scss';
import { Error } from "../Error/Error";

type Company = {
	company: Contact;
	setGlobalData: Dispatch<SetStateAction<Contact[]>>;
};

export const Company = ({ company, setGlobalData }: Company) => {
	const [data, setData] = useState(company);
	const [originalData, setOriginalData] = useState(company);
	const [errorMsg, setErrorMsg] = useState('');
	const [wasEdited, setWasEdited] = useState(false);

  const { _id } = useSelector((state: RootState) => state.user);

	const isDataChanged = (data1: Contact, data2: Contact) => {
		return JSON.stringify(data1) !== JSON.stringify(data2);
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleClick = async (contact: Contact) => {
		await fetch(`${import.meta.env.VITE_SERVER}/${contact.uuid}/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				if (res.status === 202) {
					setGlobalData(prev => prev.filter(comp => comp.link !== contact.link));
					return res.json();
				} else if (res.status === 400 && typeof res.json() === 'object') {
					console.log(res);

					setErrorMsg('Nie udało się zapisać kontaktu');
				}
			})
			.catch(ex => console.log(ex));
	};

	const handleSave = async () => {
		if (data.name === '' || data.phone.replace(/\s/g, '').length < 9) {
			return setErrorMsg(
				'Zapisywane dane są nieprawidłowe (nazwa firmy nie może być pusta, a numer telefonu mieć mniej niż 9 znaków)'
			);
		} else {
			setErrorMsg('');
		}

		const response = await fetch(`${import.meta.env.VITE_SERVER}/update-contacts/${_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			return setErrorMsg('Nie udało się zaktualizować danych');
		}

		setWasEdited(false);
		setOriginalData(data);
	};

	useEffect(() => {
		if (isDataChanged(data, originalData)) {
			setWasEdited(true);
		} else {
			setWasEdited(false);
		}
	}, [data, originalData]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setErrorMsg('');
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [errorMsg]);

	return (
		<div className={styles.company}>
			{!errorMsg ? (
				<>
					<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.name} name='name' />
					<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.phone} name='phone' />
					<span>
						<a target='_blank' rel='noopener noreferrer' className={styles.link} href={data.link}>
							Link
						</a>
					</span>
					<button onClick={() => handleClick(company)} className={styles.button} />
					{wasEdited && <button onClick={handleSave} className={styles.link}>Zapisz</button>}
				</>
			) : (
				<Error message={errorMsg} />
			)}
		</div>
	);
};