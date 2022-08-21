import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 } from 'uuid';
import KanbanAddForm from './KanbanAddForm';
import KanbanList from './KanbanList';

export type Todo = {
	id: string;
	contents: string;
	count: number;
};

export type KanbanType = 'Todo' | 'Progress' | 'Complete';

const Kanban = () => {
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [progressList, setProgressList] = useState<Todo[]>([]);
	const [completeList, setCompleteList] = useState<Todo[]>([]);

	const handleAdd = (contents: string | undefined) => {
		if (!contents) return;
		setTodoList((prevTodoList) => [...prevTodoList, { id: v4(), contents, count: 0, isComplete: false }]);
	};

	const handleDragEnd = (result: DropResult) => {
		console.log(result);

		const { source, destination } = result;
		if (!destination) return;

		let sourceItem;
		const newTodoList = [...todoList];
		const newProgressList = [...progressList];
		const newCompleteList = [...completeList];

		if (source.droppableId === 'Todo') {
			[sourceItem] = newTodoList.splice(source.index, 1);
		} else if (source.droppableId === 'Progress') {
			[sourceItem] = newProgressList.splice(source.index, 1);
		} else if (source.droppableId === 'Complete') {
			[sourceItem] = newCompleteList.splice(source.index, 1);
		}

		if (!sourceItem) return;
		if (destination.droppableId === 'Todo') {
			newTodoList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === 'Progress') {
			newProgressList.splice(destination.index, 0, sourceItem);
		} else if (destination.droppableId === 'Complete') {
			newCompleteList.splice(destination.index, 0, sourceItem);
		}

		setTodoList(newTodoList);
		setProgressList(newProgressList);
		setCompleteList(newCompleteList);
	};

	const handleIncreaseCount = (type: KanbanType, id: string) => {
		switch (type) {
			case 'Todo':
				setTodoList(
					todoList.map((todoItem) => (todoItem.id === id ? { ...todoItem, count: todoItem.count + 1 } : todoItem)),
				);
				break;
			case 'Progress':
				setProgressList(
					progressList.map((progressItem) =>
						progressItem.id === id ? { ...progressItem, count: progressItem.count + 1 } : progressItem,
					),
				);
				break;
			case 'Complete':
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
			case 'Todo':
				setTodoList(
					todoList.map((todoItem) =>
						todoItem.id === id ? { ...todoItem, count: todoItem.count === 0 ? 0 : todoItem.count - 1 } : todoItem,
					),
				);
				break;
			case 'Progress':
				setProgressList(
					progressList.map((progressItem) =>
						progressItem.id === id
							? { ...progressItem, count: progressItem.count === 0 ? 0 : progressItem.count - 1 }
							: progressItem,
					),
				);
				break;
			case 'Complete':
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
			case 'Todo':
				setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
				break;
			case 'Progress':
				setProgressList(progressList.filter((progressItem) => progressItem.id !== id));
				break;
			case 'Complete':
				setCompleteList(completeList.filter((completeItem) => completeItem.id !== id));
				break;
			default:
				break;
		}
	};

	const handles = { handleIncreaseCount, handleDecreaseCount, handleDelete };
	return (
		<Container>
			<KanbanAddForm handleAdd={handleAdd} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<FlexContainer>
					<KanbanList type={'Todo'} kanbanList={todoList} {...handles} />
					<KanbanList type={'Progress'} kanbanList={progressList} {...handles} />
					<KanbanList type={'Complete'} kanbanList={completeList} {...handles} />
				</FlexContainer>
			</DragDropContext>
		</Container>
	);
};

export default Kanban;

const Container = styled.div`
	width: 1000px;
	color: #bbb;
	* {
		box-sizing: border-box;
	}
	ul {
		padding: 0;
	}
	button {
		color: #bbb;
		cursor: pointer;
	}
	input {
		color: #bbb;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
