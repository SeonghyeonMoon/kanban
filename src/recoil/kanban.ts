import { atom } from 'recoil';

export type Todo = {
	id: number;
	contents: string;
};

export const todoListState = atom<Todo[]>({
	key: 'todoListState',
	default: [
		{ id: 1, contents: 'contents1' },
		{ id: 2, contents: 'contents2' },
		{ id: 3, contents: 'contents3' },
		{ id: 4, contents: 'contents4' },
		{ id: 5, contents: 'contents5' },
		{ id: 6, contents: 'contents6' },
		{ id: 7, contents: 'contents7' },
		{ id: 8, contents: 'contents8' },
		{ id: 9, contents: 'contents9' },
	],
});
export const progressListState = atom<Todo[]>({ key: 'progressListState', default: [] });
export const completeListState = atom<Todo[]>({ key: 'completeListState', default: [] });
