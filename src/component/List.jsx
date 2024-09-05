import React, { useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [editTask, setEditTask] = useState(null);

    // Add or Edit a Todo
    const addOrEditTodo = () => {
        if (!input.trim()) return; // Return early if input is empty

        const newTodo = { text: input, completed: false };
        if (editTask !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editTask] = { ...todos[editTask], text: input };
            setTodos(updatedTodos);
            setEditTask(null);
        } else {
            setTodos([...todos, newTodo]);
        }

        setInput("");
    };


    // Edit a task
    const editTodo = (index) => {
        setInput(todos[index].text);
        setEditTask(index);
    };


    // Remove a task
    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };


    // Mark task as completed/uncompleted
    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
            <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    To-Do List
                </h1>

                <div className="flex mb-6">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a new task or edit"
                        className="input w-full py-3 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:ring-0  "
                    />
                    <button

                        onClick={addOrEditTodo}
                        className="bg-purple-600 text-white px-6 py-3 rounded-r-full hover:bg-purple-600 transition duration-300 text-4xl"
                    >
                        {editTask !== null ? <FiEdit />
                            : <IoMdAdd />}

                    </button>
                </div>

                <div className="flex space-x-8">
                    {/* Incomplete Tasks Section */}
                    <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks To Do</h2>
                        <ul className="list-none space-y-4">
                            {todos.filter((todo) => !todo.completed).length > 0 ? (
                                todos
                                    .filter((todo) => !todo.completed)
                                    .map((todo, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-gray-50 border-l-4 border-purple-500"
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => toggleComplete(index)}
                                                    className="mr-3 w-6 h-6 text-purple-500 rounded focus:ring-purple-600"
                                                />
                                                <span className="text-lg text-gray-800">{todo.text}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => editTodo(index)}
                                                    className="text-purple-500 hover:text-purple-600 transition duration-300 text-3xl"
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    onClick={() => removeTodo(index)}
                                                    className="text-red-500 hover:text-red-600 transition duration-300 text-3xl"
                                                >
                                                    <RiDeleteBin5Line />
                                                </button>
                                            </div>
                                        </li>
                                    ))
                            ) : (
                                <p className="text-center text-gray-600">No tasks to do!</p>
                            )}
                        </ul>
                    </div>

                    {/* Completed Tasks Section */}
                    <div className="w-1/2 p-4 bg-green-100 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Completed Tasks</h2>
                        <ul className="list-none space-y-4">

                            {todos.filter((todo) => todo.completed).length > 0 ? (
                                todos
                                    .filter((todo) => todo.completed)
                                    .map((todo, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-green-50 border-l-4 border-green-400"
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => toggleComplete(index)}
                                                    className="mr-3 w-6 h-6 text-green-400 rounded focus:ring-green-400"
                                                />
                                                <span className="text-lg line-through text-gray-500">
                                                    {todo.text}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeTodo(index)}
                                                className="text-red-400 hover:text-red-600 transition duration-300 text-3xl"
                                            >
                                                <RiDeleteBin5Line />
                                            </button>
                                        </li>
                                    ))
                            ) : (
                                <p className="text-center text-gray-600">No completed tasks!</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TodoList;

