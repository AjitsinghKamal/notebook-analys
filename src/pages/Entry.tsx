import styled from '@emotion/styled';
import { Editor } from 'src/components';

function EntryPage() {
	return (
		<Page>
			<Content>
				<Editor />
			</Content>
		</Page>
	);
}

const Page = styled.main`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	max-width: 1200px;
`;
export default EntryPage;
