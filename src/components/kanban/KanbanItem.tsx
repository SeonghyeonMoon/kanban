import { Draggable } from 'react-beautiful-dnd';

type Props = {
	id: number;
	contents: string;
	index: number;
};

const KanbanItem = ({ id, contents, index }: Props) => {
	return (
		<Draggable draggableId={String(id)} index={index}>
			{(provided) => (
				<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					{contents}
				</li>
			)}
		</Draggable>
	);
};

export default KanbanItem;
