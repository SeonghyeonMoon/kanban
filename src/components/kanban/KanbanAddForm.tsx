import { useRef } from 'react';
import { FormEvent } from 'react';
import styled from 'styled-components';

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
			<Input type='text' ref={inputRef} />
			<Button>+</Button>
		</form>
	);
};

export default KanbanAddForm;

const Input = styled.input`
	width: 95%;
	height: 50px;
	border: none;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	font-size: 25px;
	padding: 0 50px;
	background-color: #eee;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	width: 5%;
	height: 50px;
	background-color: #eee;
	border: none;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	font-size: 25px;
`;
