import { useMemo, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { debounce } from 'src/utils/debounce';

const initialState: {
	top: string;
	left: string;
	display: string;
	position: 'fixed' | 'relative';
	transform: string;
} = {
	top: `-1000px`,
	left: `-1000px`,
	position: 'fixed',
	display: 'none',
	transform: 'none',
};

/**
 * watches selection and allows formatting and
 * selection modifications like showing a tooltip
 *
 */
function useFormatting<T extends HTMLElement, E extends HTMLElement>() {
	const [tooltipPos, setTooltipPos] = useState({ ...initialState });

	const targetRef = useRef<E>(null);
	const tooltipRef = useRef<T>(null);

	const computeTooltipPosition = (el: HTMLElement, startOffset: number) => {
		const rect = el.getBoundingClientRect();
		rect &&
			setTooltipPos({
				position: 'fixed',
				display: 'block',
				top: `${rect.top}px`,
				left: `${rect.left + startOffset}px`,
				transform: 'translate(25%, -100%)',
			});
	};

	/**
	 * whenever a selection is created
	 * figure out if the range is valid or not
	 * @param ev selection event
	 */
	const setSelection = (ev: Event) => {
		ev.preventDefault();
		if (
			targetRef.current &&
			!(ev.target as Element).contains(targetRef.current)
		) {
			// bail out for any selection outside the target
			return;
		}
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

	const clearOnClickOutside = (e: Event) => {
		const { target } = e;
		if (
			target &&
			tooltipRef &&
			tooltipRef.current &&
			tooltipRef.current.dataset.visible !== 'none' &&
			!tooltipRef.current.contains(target as Node)
		) {
			setTooltipPos({ ...initialState });
			return true;
		}
	};

	const onSelection = (e: Event) => {
		!clearOnClickOutside(e) && setSelection(e);
	};

	/**
	 * replaces selection range with provided
	 * modification tags
	 * @param e event
	 * @param key any valid HTML tag
	 */
	const onFormat = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		key: 'strong' | 'em' | 'u'
	) => {
		e.stopPropagation();
		const selection = document.getSelection();
		const range = selection?.getRangeAt(0);
		if (!range || !selection) return;
		const replacementEl = document.createElement(key);

		replacementEl.appendChild(
			document.createTextNode(selection.toString())
		);
		range.deleteContents();
		range.insertNode(replacementEl);
		selection.removeAllRanges();
		setTooltipPos({ ...initialState });
	};

	useEffect(() => {
		// we are only watching selections via mouse events for now
		// TODO: add selection via shift+arrow
		const debouncedSelectionHandler = debounce(onSelection, 300);
		targetRef.current &&
			tooltipRef.current &&
			window.addEventListener('mouseup', debouncedSelectionHandler);
		return () => {
			window.removeEventListener('mouseup', debouncedSelectionHandler);
		};
	}, [tooltipRef.current, targetRef.current]);

	return useMemo(
		() => ({
			tooltipRef,
			targetRef,
			styles: tooltipPos,
			onSelection: setSelection,
			onFormat,
		}),
		[tooltipPos, setSelection]
	);
}

export default useFormatting;
