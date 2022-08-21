import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { KanbanType, Todo } from './Kanban';
import KanbanItem from './KanbanItem';

type Props = {
	type: KanbanType;
	kanbanList: Todo[];
	handleIncreaseCount: (type: KanbanType, id: string) => void;
	handleDecreaseCount: (type: KanbanType, id: string) => void;
	handleDelete: (type: KanbanType, id: string) => void;
};

const KanbanList = ({ type, kanbanList, handleIncreaseCount, handleDecreaseCount, handleDelete }: Props) => {
	const handles = { handleIncreaseCount, handleDecreaseCount, handleDelete };
	return (
		<Container>
			<ListTitle>{type}</ListTitle>
			<Droppable droppableId={type}>
				{(provided) => (
					<List ref={provided.innerRef} {...provided.droppableProps}>
						{kanbanList.map((kanbanItem, index) => (
							<KanbanItem {...kanbanItem} index={index} key={kanbanItem.id} type={type} {...handles} />
						))}
						{provided.placeholder}
					</List>
				)}
			</Droppable>
		</Container>
	);
};

export default KanbanList;

const Container = styled.div`
	width: 400px;
	height: 300px;
	margin: 20px;
`;

const ListTitle = styled.h2`
	font-size: 15px;
`;

const List = styled.ul`
	list-style: none;
	height: 300px;
	padding-bottom: 10px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 5px;
		transition: .2s;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #eee;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: #ddd;
	}
`;
