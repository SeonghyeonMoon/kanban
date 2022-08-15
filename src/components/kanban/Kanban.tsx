import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { completeListState, progressListState, todoListState } from '../../recoil/kanban';
import KanbanList from './KanbanList';

const Kanban = () => {
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const [progressList, setProgressList] = useRecoilState(progressListState);
	const [completeList, setCompleteList] = useRecoilState(completeListState);

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
			<Container>
				<KanbanList listId='todoList' KanbanList={todoList} />
				<KanbanList listId='progressList' KanbanList={progressList} />
				<KanbanList listId='completeList' KanbanList={completeList} />
			</Container>
		</DragDropContext>
	);
};

export default Kanban;

const Container = styled.div`
	display: flex;
`;
