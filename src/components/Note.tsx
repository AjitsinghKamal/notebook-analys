import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import useFormatting from 'src/hooks/useFormatting';
import useWordAnalysis from 'src/hooks/useWordAnalysis';
import AnalysisBoard from './AnalysisBoard';
import Editor from './Editor';

type Props = {
	placeholder?: string;
};

function Note({ placeholder }: PropsWithChildren<Props>) {
	const { tooltipRef, onFormat, styles } = useFormatting<HTMLDivElement>();
	const {
		analysisWatchRef,
		shouldFindSimilarWords,
		matchesFound,
		resetResults,
	} = useWordAnalysis<HTMLDivElement>();

	return (
		<Container>
			<Editor ref={analysisWatchRef} />
			<AnalysisBoard
				handleWordAnalysis={shouldFindSimilarWords}
				results={matchesFound}
				resetActive={resetResults}
			/>
			<Tooltip
				ref={tooltipRef}
				style={styles}
				data-visible={styles.display}
				aria-hidden={styles.display === 'none'}
			>
				<TooltipActionBold onClick={(e) => onFormat(e, 'strong')}>
					B
				</TooltipActionBold>
				<TooltipActionItalic onClick={(e) => onFormat(e, 'em')}>
					i
				</TooltipActionItalic>
				<TooltipActionUnder onClick={(e) => onFormat(e, 'u')}>
					U
				</TooltipActionUnder>
			</Tooltip>
		</Container>
	);
}

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	position: relative;
`;

const Tooltip = styled.div`
	background: var(--primary-900);
	padding: 6px 12px;
	border-radius: 10px;
`;

const TooltipAction = styled.button`
	background: transparent;
	color: #fff;
	font-weight: 600;
	font-size: 1.2rem;
	margin: 0 6px;
	padding: 2px 8px;
	transition: color 0.3s;
	&:hover {
		color: var(--danger-100);
	}
`;

const TooltipActionBold = styled(TooltipAction)`
	font-weight: 800;
`;

const TooltipActionItalic = styled(TooltipAction)`
	font-style: italic;
`;

const TooltipActionUnder = styled(TooltipAction)`
	text-decoration: underline;
`;

export default Note;
