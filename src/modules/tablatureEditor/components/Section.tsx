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
			<SectionTuningColumn />
			{section.columns.map((column, columnIndex) => {
				return (
					<Column key={columnIndex} column={column} columnIndex={columnIndex} sectionIndex={sectionIndex} />
				);
			})}
		</div>
	);
};

export default Section;
