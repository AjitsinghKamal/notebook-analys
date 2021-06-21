import styled from '@emotion/styled';
import {
	forwardRef,
	PropsWithChildren,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import useTooltip from 'src/hooks/useTooltip';

type Props = {
	placeholder?: string;
};

function Editor({ placeholder }: PropsWithChildren<Props>) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { tooltipRef, onSelection, styles } = useTooltip<HTMLDivElement>();

	return (
		<Container>
			<Tooltip ref={tooltipRef} style={styles}>
				<TooltipActionBold>B</TooltipActionBold>
				<TooltipActionItalic>i</TooltipActionItalic>
				<TooltipActionUnder>U</TooltipActionUnder>
			</Tooltip>
			<Editable
				ref={ref}
				contentEditable
				onMouseUp={onSelection}
				placeholder={placeholder}
			/>
		</Container>
	);
}

const Container = styled.div`
	height: 100%;
	width: 100%;
`;

const Editable = styled.div`
	flex: 1;
	font-size: 1.2rem;
	line-height: 1.65;
	&:focus,
	&:focus-within {
		outline: 0;
	}
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
export default Editor;
