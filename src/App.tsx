import styled from 'styled-components';
import Kanban from './components/kanban/Kanban';

function App() {
	return (
		<Container>
			<Kanban />
		</Container>
	);
}

export default App;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
