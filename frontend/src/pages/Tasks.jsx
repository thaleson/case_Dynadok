/**
 * @file Tasks.jsx
 * @description React component for displaying a list of tasks.
 * Allows users to view tasks, navigate to task details, add a new task, or delete an existing task.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

/**
 * Tasks component displays a list of tasks and provides management functionality.
 * 
 * Features:
 * - Fetches all tasks from the server on component mount.
 * - Displays the tasks as a list with links to their details.
 * - Allows users to delete a task, updating the list dynamically.
 * - Provides a button to navigate to the form for adding new tasks.
 * 
 * @returns {JSX.Element} A list of tasks with management options.
 */
function Tasks() {
    const [tasks, setTasks] = useState([]); // State to store the list of tasks

    /**
     * Fetches the list of tasks from the server.
     * Runs on component mount.
     */
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3005/tasks');
                setTasks(response.data); // Sets the fetched tasks to the state
            } catch (error) {
                console.error('Error fetching tasks:', error); // Logs any error that occurs
            }
        }
        fetchTasks();
    }, []);

    /**
     * Deletes a task by ID and updates the list of tasks.
     * 
     * @param {number} id - The ID of the task to delete.
     */
    const deleteTask = async (id) => {
        try {

            const responseDelete =`${import.meta.env.VITE_API_URL_DELETE}/tasks/${id}`;
            const response = await axios.delete(responseDelete);
            if (response.status === 200) {
                setTasks(tasks.filter(task => task.id !== id)); // Updates the list by removing the deleted task
            }
        } catch (error) {
            console.error('Error deleting task:', error); // Logs any error that occurs
        }
    };

    return (
        <div className="container">
            <h1>📋 Lista de Textos</h1>
            <Link to="/add">
                <button className="add-button">Adicionar Novo Texto</button>
            </Link>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id}>
                            <Link to={`/task/${task.id}`}>{task.text}</Link>
                            <button onClick={() => deleteTask(task.id)} className="delete-button">
                                Deletar
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Nenhum texto encontrado.</p> 
                )}
            </ul>
        </div>
    );
}

export default Tasks;
