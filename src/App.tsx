import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

type Todo = {
	id: number;
	contents: string;
};

function App() {
	const [todoList, setTodoList] = useState<Todo[]>([
		{ id: 1, contents: 'contents1' },
		{ id: 2, contents: 'contents2' },
		{ id: 3, contents: 'contents3' },
		{ id: 4, contents: 'contents4' },
		{ id: 5, contents: 'contents5' },
		{ id: 6, contents: 'contents6' },
		{ id: 7, contents: 'contents7' },
		{ id: 8, contents: 'contents8' },
		{ id: 9, contents: 'contents9' },
	]);
	const [progressList, setProgressList] = useState<Todo[]>([]);
	const [completeList, setCompleteList] = useState<Todo[]>([]);

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) return;

		let sourceItem;
		const newTodoList = [...todoList];
		const newProgressList = [...progressList];
		const newCompleteList = [...completeList];

		if (source.droppableId === 'todoList') {
			[sourceItem] = newTodoList.splice(source.index, 1);
		} else if (source.droppableId === 'progressList') {
			[sourceItem] = newProgressList.splice(source.index, 1);
		} else if (source.droppableId === 'completeList') {
			[sourceItem] = newCompleteList.splice(source.index, 1);
		}

		if (!sourceItem) return;
		if (destination.droppableId === 'todoList') {
			newTodoList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === 'progressList') {
			newProgressList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === 'completeList') {
			newCompleteList.splice(destination.index, 0, sourceItem);
		}

		setTodoList(newTodoList);
		setProgressList(newProgressList);
		setCompleteList(newCompleteList);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<input type='text' />
			<Container>
				<Droppable droppableId='todoList'>
					{(provided) => (
						<Ul ref={provided.innerRef} {...provided.droppableProps}>
							{todoList.map(({ id, contents }, index) => (
								<Draggable draggableId={String(id)} index={index} key={id}>
									{(provided) => (
										<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											{contents}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</Ul>
					)}
				</Droppable>
				<Droppable droppableId='progressList'>
					{(provided) => (
						<Ul ref={provided.innerRef} {...provided.droppableProps}>
							{progressList.map(({ id, contents }, index) => (
								<Draggable draggableId={contents} index={index} key={id}>
									{(provided) => (
										<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											{contents}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</Ul>
					)}
				</Droppable>
				<Droppable droppableId='completeList'>
					{(provided) => (
						<Ul ref={provided.innerRef} {...provided.droppableProps}>
							{completeList.map(({ id, contents }, index) => (
								<Draggable draggableId={contents} index={index} key={id}>
									{(provided) => (
										<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											{contents}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</Ul>
					)}
				</Droppable>
			</Container>
		</DragDropContext>
	);
}

export default App;

const Container = styled.div`
	display: flex;
`;

const TotalList = styled.div``;

const Ul = styled.ul`
	width: 300px;
	height: 300px;
	border: 1px solid black;
	margin: 50px;
`;
