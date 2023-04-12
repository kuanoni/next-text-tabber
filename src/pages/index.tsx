import Head from 'next/head';

import Fretboard from '@modules/fretboard/components/Fretboard';
import TablatureControls from '@modules/tablatureEditor/components/controls/TablatureControls';
import Tablature from '@modules/tablatureEditor/components/Tablature';
import styles from '@styles/pages/index.module.scss';

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Fretboard />
				<div className={styles.tablature}>
					<Tablature />
					<TablatureControls />
				</div>
			</main>
		</>
	);
}
