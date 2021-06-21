import styled from '@emotion/styled';
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react';
import css from 'src/styles/editor.module.css';

const Editor = forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(
	(props, ref) => {
		const [showPlaceholder, setPlaceholderVisibility] = useState(true);

		const onDirty = (e: React.KeyboardEvent<HTMLDivElement>) => {
			if (showPlaceholder) {
				const target = e.target as Element;
				target.children.length > 1 && setPlaceholderVisibility(false);
			}
		};
		return (
			<>
				<Root
					className={css.editor}
					ref={ref}
					contentEditable
					onKeyPress={onDirty}
				>
					<h1>Notebook</h1>
				</Root>
				{showPlaceholder && (
					<Placeholder data-el="placeholder">
						Write down your entry ...
					</Placeholder>
				)}
			</>
		);
	}
);

const Root = styled.div`
	flex: 1 0 60%;
	font-size: 1.2rem;
	padding: 32px;
	line-height: 1.65;
	box-shadow: var(--shadow);
	border-radius: 10px;
	background: #fff;
	&:focus,
	&:focus-within {
		outline: 0;
	}
`;

const Placeholder = styled.p`
	position: absolute;
	top: 91px;
	left: 32px;
	opacity: 0.5;
	pointer-events: none;
	font-size: 1.2rem;
`;

export default Editor;
