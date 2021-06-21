import { forwardRef, PropsWithChildren } from 'react';
import css from 'src/styles/editor.module.css';

const Editor = forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(
	(props, ref) => {
		return (
			<>
				<div
					className={css.editor}
					ref={ref}
					contentEditable
					{...props}
				>
					<h1>Notebook</h1>
				</div>
				<p className="leadup">
					<span className="leadup__placeholder">
						Write down your entry ...
					</span>
				</p>
			</>
		);
	}
);

export default Editor;
