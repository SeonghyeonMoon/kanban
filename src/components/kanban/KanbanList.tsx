import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Todo } from '../../recoil/kanban';
import KanbanItem from './KanbanItem';

type Props = {
	listId: string;
	KanbanList: Todo[];
};

const KanbanList = ({ listId, KanbanList }: Props) => {
	return (
		<Droppable droppableId={listId}>
			{(provided) => (
				<Container ref={provided.innerRef} {...provided.droppableProps}>
					{KanbanList.map(({ id, contents }, index) => (
						<KanbanItem id={id} contents={contents} index={index} key={id} />
					))}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default KanbanList;

const Container = styled.ul`
	width: 300px;
	height: 300px;
	border: 1px solid black;
	margin: 50px;
`;
