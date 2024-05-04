import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { Contact } from '../../types/Contact';
import { ThreeDots } from 'react-loader-spinner';
import styles from './form.module.scss';
import { FormCorners } from '../FormCorners/FormCorners';
import { Error } from '../Error/Error';
import { URL_REGEX } from '../../../utils/regex';

const DATA = [
	{
		name: 'AS DESIGN architekt Aleksandra Stępień',
		link: 'https://www.google.com/maps/place/AS+DESIGN+architekt+Aleksandra+St%C4%99pie%C5%84/data=!4m7!3m6!1s0x471ecbb391457ecf:0x54f096a4f4244f71!8m2!3d52.2296756!4d21.0122287!16s%2Fg%2F11h5n4n1_7!19sChIJz35FkbPLHkcRcU8k9KSW8FQ?authuser=0&hl=pl&rclk=1',
		phone: '725 897 687',
	},
	{
		name: 'Architekt Tomasz Pisarski - biuro projektowe',
		link: 'https://www.google.com/maps/place/Architekt+Tomasz+Pisarski+-+biuro+projektowe/data=!4m7!3m6!1s0x471ecdabda555721:0x1dadebd9c3b46062!8m2!3d52.2471981!4d21.0122662!16s%2Fg%2F11lm012rpv!19sChIJIVdV2qvNHkcRYmC0w9nrrR0?authuser=0&hl=pl&rclk=1',
		phone: '605 070 641',
	},
	{
		name: 'Bezpieczny Dom. Borys D.',
		link: 'https://www.google.com/maps/place/Bezpieczny+Dom.+Borys+D./data=!4m7!3m6!1s0x47192e450ba93735:0x9d292caa08159fd2!8m2!3d52.0686764!4d21.0325061!16s%2Fg%2F1w6644fr!19sChIJNTepC0UuGUcR0p8VCKosKZ0?authuser=0&hl=pl&rclk=1',
		phone: '601 254 157',
	},
	{
		name: 'Stanisław Depowski Architekt, Uchi sp z oo',
		link: 'https://www.google.com/maps/place/Stanis%C5%82aw+Depowski+Architekt,+Uchi+sp+z+oo/data=!4m7!3m6!1s0x471ecb858af00001:0x29a227cbcd4319fe!8m2!3d52.2542081!4d20.980862!16s%2Fg%2F11hyxn3tb3!19sChIJAQDwioXLHkcR_hlDzcsnoik?authuser=0&hl=pl&rclk=1',
		phone: '503 520 268',
	},
	{
		name: 'Atrium, Rafał Cieślak - architekt',
		link: 'https://www.google.com/maps/place/Atrium,+Rafa%C5%82+Cie%C5%9Blak+-+architekt/data=!4m7!3m6!1s0x471935ed2012ac51:0x9f535e27997c7730!8m2!3d52.1637989!4d20.8029084!16s%2Fg%2F1tnhx258!19sChIJUawSIO01GUcRMHd8mSdeU58?authuser=0&hl=pl&rclk=1',
		phone: '608 631 263',
	},
	{
		name: 'TYMIŃSKI ARCHITEKTONICZNE BIURO PROJEKTOWE',
		link: 'https://www.google.com/maps/place/TYMI%C5%83SKI+ARCHITEKTONICZNE+BIURO+PROJEKTOWE/data=!4m7!3m6!1s0x471945e3d162b337:0xf85c8b1e768333df!8m2!3d52.0802019!4d20.5730325!16s%2Fg%2F11f3c65rqx!19sChIJN7Ni0eNFGUcR3zODdh6LXPg?authuser=0&hl=pl&rclk=1',
		phone: '790 240 095',
	},
	{
		name: 'ARCHITEKT',
		link: 'https://www.google.com/maps/place/ARCHITEKT/data=!4m7!3m6!1s0x471933ae41f06819:0x4afb53d8a1212cc8!8m2!3d52.1787041!4d21.0499638!16s%2Fg%2F1v75qn67!19sChIJGWjwQa4zGUcRyCwhodhT-0o?authuser=0&hl=pl&rclk=1',
		phone: '696 976 906',
	},
	{
		name: 'INEKS design, architekt wnętrz',
		link: 'https://www.google.com/maps/place/INEKS+design,+architekt+wn%C4%99trz/data=!4m7!3m6!1s0x471ecd7d1efe4995:0xb821016cc20e555b!8m2!3d52.2354376!4d21.0847788!16s%2Fg%2F11hjlm0c_x!19sChIJlUn-Hn3NHkcRW1UOwmwBIbg?authuser=0&hl=pl&rclk=1',
		phone: '504 546 515',
	},
	{
		name: 'Hubert Zalewski Architekt IARP Projektowanie i Nadzór Inwestorski',
		link: 'https://www.google.com/maps/place/Hubert+Zalewski+Architekt+IARP+Projektowanie+i+Nadz%C3%B3r+Inwestorski/data=!4m7!3m6!1s0x471ecd4d67e10dbf:0x7731efcad655c670!8m2!3d52.2391091!4d21.0784925!16s%2Fg%2F11jfzkyg5f!19sChIJvw3hZ03NHkcRcMZV1srvMXc?authuser=0&hl=pl&rclk=1',
		phone: '664 327 332',
	},
	{
		name: 'Charkiewicz Robert, architekt',
		link: 'https://www.google.com/maps/place/Charkiewicz+Robert,+architekt/data=!4m7!3m6!1s0x471ecc5f469a987b:0x19ceedc8f8f9571e!8m2!3d52.2370812!4d21.0207072!16s%2Fg%2F1tghbx66!19sChIJe5iaRl_MHkcRHlf5-Mjtzhk?authuser=0&hl=pl&rclk=1',
		phone: '22 828 37 56',
	},
	{
		name: 'El-Arch. Dudzińska G., architekt',
		link: 'https://www.google.com/maps/place/El-Arch.+Dudzi%C5%84ska+G.,+architekt/data=!4m7!3m6!1s0x471ecce935b67f43:0x4b360646980c9376!8m2!3d52.2205618!4d21.0115713!16s%2Fg%2F1wz51gkf!19sChIJQ3-2NenMHkcRdpMMmEYGNks?authuser=0&hl=pl&rclk=1',
		phone: '22 875 86 19',
	},
	{
		name: 'Atelier Seweryn Rotowski, mgr inż. architekt',
		link: 'https://www.google.com/maps/place/Atelier+Seweryn+Rotowski,+mgr+in%C5%BC.+architekt/data=!4m7!3m6!1s0x471eca3906d954db:0x921c8c28e39e9d8f!8m2!3d52.2794814!4d20.9202851!16s%2Fg%2F1ptyytdgk!19sChIJ21TZBjnKHkcRj52e4yiMHJI?authuser=0&hl=pl&rclk=1',
		phone: '22 663 66 01',
	},
	{
		name: 'Architekt Paweł Wołejsza',
		link: 'https://www.google.com/maps/place/Architekt+Pawe%C5%82+Wo%C5%82ejsza/data=!4m7!3m6!1s0x47193388366becd5:0xe90ac972d39e42ff!8m2!3d52.1787491!4d21.0498833!16s%2Fg%2F11h0stztm0!19sChIJ1exrNogzGUcR_0Ke03LJCuk?authuser=0&hl=pl&rclk=1',
		phone: '696 976 906',
	},
	{
		name: 'Architekt - Karol Milczarek',
		link: 'https://www.google.com/maps/place/Architekt+-+Karol+Milczarek/data=!4m7!3m6!1s0x47198b78c72dd625:0xcd945999a75a5097!8m2!3d52.2437564!4d20.9875853!16s%2Fg%2F11jv2c9cp0!19sChIJJdYtx3iLGUcRl1Bap5lZlM0?authuser=0&hl=pl&rclk=1',
		phone: '000'
	},
	{
		name: 'Architekt W&A SKA',
		link: 'https://www.google.com/maps/place/Architekt+W%26A+SKA/data=!4m7!3m6!1s0x4719345e3a983f3f:0x816f5b8e97c6ef46!8m2!3d52.1681171!4d20.8878633!16s%2Fg%2F11f2snwqwc!19sChIJPz-YOl40GUcRRu_Gl45bb4E?authuser=0&hl=pl&rclk=1',
		phone: '881 272 900',
	},
	{
		name: 'Pracownia Architektoniczna Aleksandra Wasilkowska',
		link: 'https://www.google.com/maps/place/Pracownia+Architektoniczna+Aleksandra+Wasilkowska/data=!4m7!3m6!1s0x4719347830c3423d:0xf437fcfad8ed8e8a!8m2!3d52.2359584!4d21.0208709!16s%2Fg%2F11xk8w_td!19sChIJPULDMHg0GUcRio7t2Pr8N_Q?authuser=0&hl=pl&rclk=1',
		phone: '000'
	},
	{
		name: 'Architekt Projekty Piaseczno i Okolice',
		link: 'https://www.google.com/maps/place/Architekt+Projekty+Piaseczno+i+Okolice/data=!4m7!3m6!1s0x80a21dd170d56a8b:0xd8f4f1a8849ac87e!8m2!3d52.0871663!4d21.0126037!16s%2Fg%2F11sjr5gypb!19sChIJi2rVcNEdooARfsiahKjx9Ng?authuser=0&hl=pl&rclk=1',
		phone: '501 550 009',
	},
	{
		name: 'Architekt Barbara Tucholska',
		link: 'https://www.google.com/maps/place/Architekt+Barbara+Tucholska/data=!4m7!3m6!1s0x47192e089e406cf7:0x3878f56b3b369d4a!8m2!3d52.097739!4d21.0250369!16s%2Fg%2F11gfk0h537!19sChIJ92xAngguGUcRSp02O2v1eDg?authuser=0&hl=pl&rclk=1',
		phone: '608 759 850',
	},
	{
		name: 'Gołębiowska-Koszańska Ewa, architekt. Autorska pracownia projektowa',
		link: 'https://www.google.com/maps/place/Go%C5%82%C4%99biowska-Kosza%C5%84ska+Ewa,+architekt.+Autorska+pracownia+projektowa/data=!4m7!3m6!1s0x471eb64bb1ce0e87:0x6e8785d5adfa4708!8m2!3d52.346421!4d20.8850729!16s%2Fg%2F11xc22mdl!19sChIJhw7OsUu2HkcRCEf6rdWFh24?authuser=0&hl=pl&rclk=1',
		phone: '888 805 777',
	},
	{
		name: 'Architekt & Co. Pracownia projektowa',
		link: 'https://www.google.com/maps/place/Architekt+%26+Co.+Pracownia+projektowa/data=!4m7!3m6!1s0x47192d9eed1f36b5:0xc27b657edf71323!8m2!3d52.1349353!4d21.0650963!16s%2Fg%2F1tdx7g43!19sChIJtTYf7Z4tGUcRIxP37Ve2Jww?authuser=0&hl=pl&rclk=1',
		phone: '22 448 08 81',
	},
	{
		name: 'architekt Marlena Tomasik',
		link: 'https://www.google.com/maps/place/architekt+Marlena+Tomasik/data=!4m7!3m6!1s0x471948fbf1c58fb1:0x10453bced90ed22a!8m2!3d52.1174908!4d20.665864!16s%2Fg%2F1232kdzfd!19sChIJsY_F8ftIGUcRKtIO2c47RRA?authuser=0&hl=pl&rclk=1',
		phone: '506 586 913',
	},
	{
		name: 'ARCHITEKT',
		link: 'https://www.google.com/maps/place/ARCHITEKT/data=!4m7!3m6!1s0x471935135cbace49:0xd710fa0fa2dea93e!8m2!3d51.9537505!4d19.1343786!16s%2Fg%2F11h0thcnz4!19sChIJSc66XBM1GUcRPqneog_6ENc?authuser=0&hl=pl&rclk=1',
		phone: '696 976 906',
	},
	{
		name: 'Hubert Polkowski Architekt - Warszawskie biuro projektowe',
		link: 'https://www.google.com/maps/place/Hubert+Polkowski+Architekt+-+Warszawskie+biuro+projektowe/data=!4m7!3m6!1s0x471ecb518572cf27:0xa5212998366c01cf!8m2!3d52.2055106!4d21.0286054!16s%2Fg%2F11h2ncfb0j!19sChIJJ89yhVHLHkcRzwFsNpgpIaU?authuser=0&hl=pl&rclk=1',
		phone: '691 888 000',
	},
	{
		name: 'Architekt - Szuflada Projektów',
		link: 'https://www.google.com/maps/place/Architekt+-+Szuflada+Projekt%C3%B3w/data=!4m7!3m6!1s0x471935841cd7cc2b:0xf7683077ff4b56be!8m2!3d52.1809886!4d20.8037818!16s%2Fg%2F11bw478n0z!19sChIJK8zXHIQ1GUcRvlZL_3cwaPc?authuser=0&hl=pl&rclk=1',
		phone: '795 428 945',
	},
	{
		name: 'ARCHITEKT Jarosław Głuszek',
		link: 'https://www.google.com/maps/place/ARCHITEKT+Jaros%C5%82aw+G%C5%82uszek/data=!4m7!3m6!1s0x47194b0828137919:0x4bc538b140fae7a7!8m2!3d52.2023113!4d20.7213517!16s%2Fg%2F11c3k2_47z!19sChIJGXkTKAhLGUcRp-f6QLE4xUs?authuser=0&hl=pl&rclk=1',
		phone: '501 144 571',
	},
];


interface FormProps {
	setData: Dispatch<SetStateAction<Contact[]>>
}

export const MapsForm = ({ setData }: FormProps) => {
	const [link, setLink] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const onClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const index = Math.ceil(Math.random() * 10);

		if (!link) {
			const message =
				index === 5 ? 'Sprawdzasz ile razy możesz kliknąć przycisk? ;)' : 'Musisz wprowadzić adres URL :)';
			setError(message);
			return null;
		}

		const isValid = URL_REGEX.test(link);

		if (!isValid) {
			const message = index === 5 ? 'Sprawdzasz ile razy możesz kliknąć przycisk? ;)' : 'Adres jest nieprawidłowy :(';
			setError(message);
			return null;
		}

		setError('');
		setLoading(true);

		const resData = DATA.map(contact => contact)

		// const response = await fetch('/data', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		message: link,
		// 	}),
		// });

		// const resData: Contact = await response.json();
		setData([...resData]);
		setLoading(false);
	};

	return (
		<div className={styles['form__container']}>
			<form className={styles.form} action='http://localhost:3000/data' method='POST'>
				<div className={styles['form__frame']}>
					<input className={styles['form__input']} type='text' value={link} onChange={e => setLink(e.target.value)} />
					<FormCorners />
				</div>
				{!loading ? (
					<button className={styles['form__button']} onClick={onClickHandler} type='submit'>
						Wyślij
					</button>
				) : (
					<ThreeDots visible={true} height={80} width={80} color='#ee5622' radius={9} ariaLabel='three-dots-loading' />
				)}
				{error && <Error message={error} />}
			</form>
		</div>
	);
};
