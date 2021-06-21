import styled from '@emotion/styled';

function Editor() {
	return (
		<Container>
			<Editable contentEditable />
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
`;

export default Editor;
