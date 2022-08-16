import { useRef } from 'react';
import { FormEvent } from 'react';

type Props = {
	handleAdd: (contents: string | undefined) => void;
};

const KanbanAddForm = ({ handleAdd }: Props) => {
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAdd(inputRef.current?.value);
		formRef.current?.reset();
	};

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<input type='text' ref={inputRef} />
			<button>+</button>
		</form>
	);
};

export default KanbanAddForm;
