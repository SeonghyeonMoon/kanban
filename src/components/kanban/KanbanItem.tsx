import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { KanbanType } from '../../enums';

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
					<p>
						<CountButton onClick={() => handleDecreaseCount(type, id)}>-</CountButton>
						{count}
						<CountButton onClick={() => handleIncreaseCount(type, id)}>+</CountButton>
					</p>
					<DeleteButton onClick={() => handleDelete(type, id)}>X</DeleteButton>
				</Container>
			)}
		</Draggable>
	);
};

export default KanbanItem;

const Container = styled.li`
	width: 300px;
	background-color: #666;
	color: #fff;
	border-radius: 10px;
	padding: 10px;
	position: relative;
	& + & {
		margin-top: 10px;
	}
`;

const CountButton = styled.button`
	width: 15px;
	height: 15px;
	border-radius: 10px;
	border: none;
	background-color: #fff;
	margin: 0 10px;
`;

const DeleteButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
`;
