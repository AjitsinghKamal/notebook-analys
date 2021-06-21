import styled from '@emotion/styled';
import { ReactComponent as Spinner } from 'src/assets/spinner.svg';

const Fallback = styled(Spinner)`
	width: 32px;
	opacity: 0.7;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default Fallback;
