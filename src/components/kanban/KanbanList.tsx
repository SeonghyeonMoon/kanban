import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { KanbanType } from '../../enums';
import { Todo } from './Kanban';
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
			<h1>{type}</h1>
			<Droppable droppableId={type}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{kanbanList.map((kanbanItem, index) => (
							<KanbanItem {...kanbanItem} index={index} key={kanbanItem.id} type={type} {...handles} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Container>
	);
};

export default KanbanList;

const Container = styled.ul`
	width: 300px;
	height: 300px;
	min-height: 900px;
	margin: 0 20px;
`;
