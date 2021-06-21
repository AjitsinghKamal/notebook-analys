import { useMemo, useRef, useState, useEffect, SyntheticEvent } from 'react';

const initialState: {
	top: string;
	left: string;
	display: string;
	position: 'absolute' | 'relative';
	transform: string;
} = {
	top: `-1000px`,
	left: `-1000px`,
	position: 'absolute',
	display: 'none',
	transform: 'none',
};

function useTooltip<T extends HTMLElement>() {
	const [tooltipPos, setTooltipPos] = useState({ ...initialState });
	const tooltipRef = useRef<T>(null);

	const computeTooltipPosition = (el: HTMLElement, startOffset: number) => {
		const rect = el.getBoundingClientRect();
		rect &&
			setTooltipPos({
				position: 'absolute',
				display: 'block',
				top: `${rect.top}px`,
				left: `${rect.left + startOffset}px`,
				transform: 'translate(25%, -100%)',
			});
	};

	const setSelection = (ev: SyntheticEvent) => {
		ev.preventDefault();
		ev.nativeEvent.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

		const selection = document.getSelection();
		const range = selection?.getRangeAt(0);
		if (
			!range ||
			!range.startContainer ||
			range.startOffset === range.endOffset
		) {
			return;
		}
		const element = range?.startContainer?.parentElement;
		element && computeTooltipPosition(element, range.startOffset);
	};

	const clearOnClickOutside = (e: FocusEvent) => {
		const { target } = e;
		if (
			target &&
			tooltipRef &&
			tooltipRef.current &&
			!tooltipRef.current.contains(target as Node)
		) {
			setTooltipPos({ ...initialState });
		}
	};

	useEffect(() => {
		tooltipRef.current &&
			window.addEventListener('mouseup', clearOnClickOutside);
		return () => window.removeEventListener('mouseup', clearOnClickOutside);
	}, [tooltipRef.current]);

	return useMemo(
		() => ({
			tooltipRef,
			styles: tooltipPos,
			onSelection: setSelection,
		}),
		[tooltipPos, setSelection]
	);
}

export default useTooltip;
