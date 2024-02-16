import  { FC, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { DataResult } from "../../../types/Types";
import axios from "axios";
import { Cards } from "../cards/Cards";
import scss from "./NewTodoList.module.scss";
const url = import.meta.env.VITE_BEKENT_URL;

const NewTodoList: FC<{
	state: DataResult[];
}> = ({ state }) => {
	const [data, setData] = useState<DataResult[]>(state);
	const [values, setValues] = useState("");
	const [values2, setValues2] = useState("");
	const [isResult, setIsResult] = useState<boolean | null | number>(false);
	const [editValue, setEditValue] = useState<string>("");
	const [editValue2, setEditValue2] = useState<string>("");

	const getUsers = async () => {
		try {
			const response = (await axios.get(url)).data;
			setData(response);
			setValues("");
		} catch (error) {
			console.log(error);
		}
	};

	const postUsers = async () => {
		const newData = {
			title: values,
			date: values2,
		};
		try {
			const response = (await axios.post(url, newData)).data;
			setData(response);
			getUsers();
			setValues("");
			setValues2("");
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUsers = async (id: number) => {
		try {
			const response = (await axios.delete(`${url}/${id}`)).data;
			getUsers();
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const patchUsers = async (id: number, isAuth: boolean) => {
		try {
			// const response = (
			// 	await axios.patch(`${url}/${id}`, {
			// 		isAuth: Boolean =  true,
			// 	})
			// ).data;
			const response = (
				await axios.patch(`${url}/${id}`, {
					isAuth: isAuth,
				})
			).data;
			setData(response);

			getUsers();
		} catch (error) {
			console.log(error);
		}
	};

	const pathResults = async (id: number) => {
		try {
			const response = (
				await axios.patch(`${url}/${id}`, {
					isAuth: true,
					title: editValue,
					date: editValue2,
				})
			).data;
			setData(response);
			setIsResult(null);
			// getUsers();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<section>
			<div className="container">
				<h1>Todo-List</h1>
				<div className={scss.form}>
					<TextField
						className={scss.inputs}
						type="text"
						id="title"
						label="title"
						variant="outlined"
						value={values}
						onChange={(e) => setValues(e.target.value)}
					/>
					<TextField
						className={scss.inputs}
						type="date"
						id="date"
						label="date"
						variant="outlined"
						value={values2}
						onChange={(e) => setValues2(e.target.value)}
					/>
					<Button onClick={postUsers} variant="outlined">
						Add todo
					</Button>
				</div>
				<div className={scss.cards}>
					<Cards
						setEditValue={setEditValue}
						setEditValue2={setEditValue2}
						editValue={editValue}
						editValue2={editValue2}
						pathResults={pathResults}
						patchUsers={patchUsers}
						deleteUsers={deleteUsers}
						data={data}
						isResult={isResult}
						setIsResult={setIsResult}
					/>
				</div>
			</div>
		</section>
	);
};

export default NewTodoList;
