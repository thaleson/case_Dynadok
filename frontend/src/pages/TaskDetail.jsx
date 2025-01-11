/**
 * @file TaskDetail.jsx
 * @description React component for displaying the details of a specific task.
 * Fetches task data from the server based on the task ID from the URL parameters.
 * Provides a link for navigating back to the homepage.
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

/**
 * TaskDetail component fetches and displays the details of a task.
 * 
 * Features:
 * - Retrieves the task data using the ID from the URL parameters.
 * - Displays task text, summary, and selected language.
 * - Provides a loading indicator while the task data is being fetched.
 * - Includes a navigation link to return to the homepage.
 * 
 * @returns {JSX.Element} A detailed view of a specific task.
 */
function TaskDetail() {
    const { id } = useParams(); // Extracts the task ID from the URL parameters
    const [task, setTask] = useState(null); // State to store the fetched task data

    /**
     * Fetches the task data from the server based on the task ID.
     * Runs on component mount or when the `id` parameter changes.
     */
    useEffect(() => {
        async function fetchTask() {
            try {
                const responseGet = `${import.meta.env.VITE_API_URL_DETAILS}/tasks/${id}`;
                const response = await axios.get(responseGet);
                setTask(response.data); // Sets the fetched task data to the state
            } catch (error) {
                console.error('Error fetching task:', error); // Logs any error that occurs
            }
        }
        fetchTask();
    }, [id]);

    // Displays a loading message while the task data is being fetched
    if (!task) return <p>Carregando tarefa...</p>;

    return (
        <div className="container">
            <h1>Detalhes do seu texto</h1>
            <h2>Seu texto número: {task.id}</h2>
            <p><strong>Texto:</strong> {task.text}</p>
            <p><strong>Resumo:</strong> {task.summary}</p>
            <p><strong>Língua escolhida:</strong> {task.lang}</p>

            <Link to="/" className="btn btn-primary">Voltar ao Início</Link>
        </div>
    );
}

export default TaskDetail;
