import Column from './Column';
import SectionTuningColumn from './SectionTuningColumn';
import styles from './Tablature.module.scss';

interface Props {
	sectionIndex: number;
	section: Section;
}

const Section = ({ sectionIndex, section }: Props) => {
	return (
		<div className={styles.section} data-testid='section'>
			<h2>{section.name}</h2>
			<div className={styles['columns-container']}>
				<SectionTuningColumn />
				{section.columns.map((column, columnIndex) => {
					return (
						<Column
							key={columnIndex}
							column={column}
							columnIndex={columnIndex}
							sectionIndex={sectionIndex}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Section;
