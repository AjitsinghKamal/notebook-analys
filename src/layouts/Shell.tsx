import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

function Shell({ children }: PropsWithChildren<unknown>) {
	return (
		<Container>
			<Header />
			<Content>{children}</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 100vh;
	width: 100vw;
`;

const Header = styled.header`
	height: 80px;
	background: #fff;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const Content = styled.div`
	flex: 1;
	padding: 32px 32px 16px;
	overflow-x: hidden;
	overflow-y: auto;
`;

export default Shell;
