import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { KanbanType, KanbanTypes } from '../../enums';
import KanbanAddForm from './KanbanAddForm';
import KanbanList from './KanbanList';

export type Todo = {
	id: string;
	contents: string;
	count: number;
};

const Kanban = () => {
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [progressList, setProgressList] = useState<Todo[]>([]);
	const [completeList, setCompleteList] = useState<Todo[]>([]);

	const handleAdd = (contents: string | undefined) => {
		if (!contents) return;
		setTodoList((prevTodoList) => [...prevTodoList, { id: v4(), contents, count: 0, isComplete: false }]);
	};

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) return;

		let sourceItem;
		const newTodoList = [...todoList];
		const newProgressList = [...progressList];
		const newCompleteList = [...completeList];

		if (source.droppableId === KanbanTypes.Todo) {
			[sourceItem] = newTodoList.splice(source.index, 1);
		} else if (source.droppableId === KanbanTypes.Progress) {
			[sourceItem] = newProgressList.splice(source.index, 1);
		} else if (source.droppableId === KanbanTypes.Complete) {
			[sourceItem] = newCompleteList.splice(source.index, 1);
		}

		if (!sourceItem) return;
		if (destination.droppableId === KanbanTypes.Todo) {
			newTodoList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === KanbanTypes.Progress) {
			newProgressList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === KanbanTypes.Complete) {
			newCompleteList.splice(destination.index, 0, sourceItem);
		}

		setTodoList(newTodoList);
		setProgressList(newProgressList);
		setCompleteList(newCompleteList);
	};

	const handleIncreaseCount = (type: KanbanType, id: string) => {
		switch (type) {
			case KanbanTypes.Todo:
				setTodoList(
					todoList.map((todoItem) => (todoItem.id === id ? { ...todoItem, count: todoItem.count + 1 } : todoItem)),
				);
				break;
			case KanbanTypes.Progress:
				setProgressList(
					progressList.map((progressItem) =>
						progressItem.id === id ? { ...progressItem, count: progressItem.count + 1 } : progressItem,
					),
				);
				break;
			case KanbanTypes.Complete:
				setCompleteList(
					completeList.map((completeItem) =>
						completeItem.id === id ? { ...completeItem, count: completeItem.count + 1 } : completeItem,
					),
				);
				break;
			default:
				break;
		}
	};

	const handleDecreaseCount = (type: KanbanType, id: string) => {
		switch (type) {
			case KanbanTypes.Todo:
				setTodoList(
					todoList.map((todoItem) =>
						todoItem.id === id ? { ...todoItem, count: todoItem.count === 0 ? 0 : todoItem.count - 1 } : todoItem,
					),
				);
				break;
			case KanbanTypes.Progress:
				setProgressList(
					progressList.map((progressItem) =>
						progressItem.id === id
							? { ...progressItem, count: progressItem.count === 0 ? 0 : progressItem.count - 1 }
							: progressItem,
					),
				);
				break;
			case KanbanTypes.Complete:
				setCompleteList(
					completeList.map((completeItem) =>
						completeItem.id === id
							? { ...completeItem, count: completeItem.count === 0 ? 0 : completeItem.count - 1 }
							: completeItem,
					),
				);
				break;
			default:
				break;
		}
	};

	const handleDelete = (type: KanbanType, id: string) => {
		switch (type) {
			case KanbanTypes.Todo:
				setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
				break;
			case KanbanTypes.Progress:
				setProgressList(progressList.filter((progressItem) => progressItem.id !== id));
				break;
			case KanbanTypes.Complete:
				setCompleteList(completeList.filter((completeItem) => completeItem.id !== id));
				break;
			default:
				break;
		}
	};

	const handles = { handleIncreaseCount, handleDecreaseCount, handleDelete };
	return (
		<>
			<KanbanAddForm handleAdd={handleAdd} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<Container>
					<KanbanList type={KanbanTypes.Todo} kanbanList={todoList} {...handles} />
					<KanbanList type={KanbanTypes.Progress} kanbanList={progressList} {...handles} />
					<KanbanList type={KanbanTypes.Complete} kanbanList={completeList} {...handles} />
				</Container>
			</DragDropContext>
		</>
	);
};

export default Kanban;

const Container = styled.div`
	display: flex;
`;
