import styled from '@emotion/styled';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCache, setCache } from 'src/utils/storage';
import { debounce } from 'src/utils/debounce';

/**
 * custom rich text editor
 */
const Editor = forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(
	(_, ref) => {
		const [cache, setState] = useState({
			exists: false, // local copy exists
			showPlaceholder: true, // show placeholder decor
			value: '', // local copy value
			verifying: true // querying local cache
		});

		const { t } = useTranslation();

		/**
		 * remove the decorative placeholder on text entry and
		 * schedule update to local indexedDB
		 */
		const onDirty = debounce((e: React.KeyboardEvent<HTMLDivElement>) => {
			const target = e.target as Element;
			if (cache.showPlaceholder && target.children.length > 1) {
				setState({...cache, showPlaceholder: false});
			}
			setCache('entry', target.innerHTML)
		}, 600);


		const loadEntryIfExist = async () => {
			const _default = '<h1>Notebook</h1>';
			try {
				const cachedHtml = await getCache<string>('entry');
				setState({
					exists: true,
					value: cachedHtml || _default,
					verifying: false,
					showPlaceholder: false
				});
			} catch (e) {
				setState({
					exists: false,
					value: _default,
					verifying: false,
					showPlaceholder: true
				});
			}
		}

		useEffect(() => {
			loadEntryIfExist();
		}, []);

		return (
			<>
				<Root
					ref={ref}
					contentEditable={!cache.verifying}
					onKeyPress={onDirty}
					dangerouslySetInnerHTML={!cache.verifying ? {__html: cache.value} : undefined}
				/>
				{cache.showPlaceholder && (
					<Placeholder data-el="placeholder">
						{t('entry.placeholder')}
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
	overflow-y: auto;
	overflow-x: hidden;
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
