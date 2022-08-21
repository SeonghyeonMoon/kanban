import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { KanbanType } from './Kanban';

type Props = {
	id: string;
	contents: string;
	count: number;
	index: number;
	type: KanbanType;
	handleIncreaseCount: (type: KanbanType, id: string) => void;
	handleDecreaseCount: (type: KanbanType, id: string) => void;
	handleDelete: (type: KanbanType, id: string) => void;
};

const KanbanItem = ({
	id,
	contents,
	count,
	index,
	type,
	handleIncreaseCount,
	handleDecreaseCount,
	handleDelete,
}: Props) => {
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<p>{contents}</p>
					<Counter>
						<CountButton onClick={() => handleDecreaseCount(type, id)}>-</CountButton>
						{count}
						<CountButton onClick={() => handleIncreaseCount(type, id)}>+</CountButton>
					</Counter>
					<DeleteButton onClick={() => handleDelete(type, id)}>X</DeleteButton>
				</Container>
			)}
		</Draggable>
	);
};

export default KanbanItem;

const Container = styled.li`
	width: 95%;
	height: 80px;
	background-color: #fff;
	border-radius: 5px;
	padding: 5px 10px;
	position: relative;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
	& + & {
		margin-top: 10px;
	}
	p {
		width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const Counter = styled.div`
	position: absolute;
	bottom: 10px;
	right: 10px;
`;

const CountButton = styled.button`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	border: none;
	background: none;
	color: #bbb;
	margin: 0 10px;
`;

const DeleteButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
`;
