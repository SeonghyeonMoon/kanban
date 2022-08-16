export enum KanbanTypes {
	Todo = 'TODO',
	Progress = 'PROGRESS',
	Complete = 'COMPLETE',
}

export type KanbanType = KanbanTypes.Todo | KanbanTypes.Progress | KanbanTypes.Complete;
