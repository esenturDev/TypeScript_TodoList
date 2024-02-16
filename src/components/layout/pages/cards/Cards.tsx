import { FC, useState } from "react";
import { DataResult } from "../../../types/Types";
import { Button, TextField } from "@mui/material";
import scss from "./Cards.module.scss";

export const Cards: FC<{
	data: DataResult[];
	deleteUsers: (id: number) => void;
	patchUsers: (id: number, isAuth: boolean) => void;
	pathResults: (id: number, isAuth: boolean) => void;
	editValue: string;
	editValue2: string;
	setEditValue: (value: string) => void;
	setEditValue2: (value: string) => void;
	isResult: boolean | number | null;
	setIsResult: (boolean: boolean | number) => void;
	// values2: string;
	// values: string;
	// setValues: () => void;
	// setValues2: () => void;
}> = ({
	data,
	deleteUsers,
	patchUsers,
	pathResults,
	editValue,
	isResult,
	setIsResult,
	editValue2,
	setEditValue,
	setEditValue2,
	// setValues,
	// setValues2,
	// values,
	// values2,
}) => {
	const [resultValues, setResultValues] = useState<boolean | null>(null);
	return (
		<div className={scss.divCard}>
			{data.map((item) => (
				<div className={scss.card} key={item._id}>
					{isResult === item._id ? (
						<>
							<TextField
								className={scss.inputs}
								type="text"
								id="title"
								label="title"
								variant="outlined"
								value={resultValues ? item.title : editValue}
								onChange={(e) => {
									setResultValues(false);
									setEditValue(e.target.value);
								}}
								// onChange={(e) => setValueInputs(e.target.value)}
							/>
							<TextField
								className={scss.inputs}
								type="date"
								id="date"
								label="date"
								variant="outlined"
								value={resultValues ? item.date : editValue2}
								onChange={(e) => {
									setResultValues(false);
									setEditValue2(e.target.value);
								}}
							/>
							<Button
								onClick={() => {
									pathResults(item._id, item.isAuth);
								}}>
								Patch
							</Button>
						</>
					) : (
						<>
							<h2>{item.title}</h2>
							<p>{item.date}</p>
							<Button
								onClick={() => {
									setIsResult(item._id);
									patchUsers(item._id, item.isAuth);
									setResultValues(true);
								}}
								variant="outlined">
								Patch
							</Button>
						</>
					)}
					<Button onClick={() => deleteUsers(item._id)} variant="outlined">
						Delete
					</Button>
				</div>
			))}
		</div>
	);
};
