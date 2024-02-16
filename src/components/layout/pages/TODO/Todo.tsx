import { FC, useState } from "react";
import NewTodoList from "../NewTodoList/NewTodoList";
import { DataResult } from "../../../types/Types";
import scss from './Todo.module.scss';

export const Todo: FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, _] = useState<DataResult[]>([]);

	return (
		<div className={scss.todo}>
			<>
				<NewTodoList state={state}  />
			</>
		</div>
	);
};
