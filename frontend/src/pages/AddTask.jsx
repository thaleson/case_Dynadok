/**
 * @file AddTask.jsx
 * @description React component for adding a new task through a form.
 * The form allows the user to input text, select a language, and submit the data to the server.
 * Once the task is created, the user is redirected to the task details page.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

/**
 * AddTask component provides a form interface for creating new tasks.
 * 
 * Features:
 * - Text input for the task.
 * - Dropdown for selecting the language.
 * - Displays a loading state while the request is being processed.
 * - Redirects the user to the task details page upon successful task creation.
 * 
 * @returns {JSX.Element} A form interface for adding tasks.
 */
function AddTask() {
    const [text, setText] = useState(''); // State to manage the task text input
    const [lang, setLang] = useState('pt'); // State to manage the selected language
    const [loading, setLoading] = useState(false); // State to control the loading indicator
    const navigate = useNavigate();

    
    /**
     * Handles the form submission to create a new task.
     * Sends a POST request with the task details and navigates to the task details page.
     * 
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activate loading state

        try {
            
            const responsePost = (`${import.meta.env.VITE_API_URL}/tasks`);
            const response = await axios.post(responsePost, { text, lang }); // Use the API URL
            console.log(responsePost); // Verifique se a variável está sendo exibida no console


            const taskId = response.data.id; // Retrieves the ID of the newly created task
            navigate(`/tasks/${taskId}`); // Redirects to the task details page
        } catch (error) {
            console.error('Error adding task:', error); // Logs any error that occurs
        } finally {
            setLoading(false); // Deactivates the loading state after the process
        }
    };

    return (
        <div className="container">
            <h1>Adicionar Novo Texto</h1>

            {loading ? (
                <div className="loading-container">
                    <p>🚀 Nossa IA está traduzindo e resumindo seu texto, aguarde...</p>
                    <div className="loading-emoticons">
                        <span>🔄</span>
                        <span>⌛</span>
                        <span>🧠</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Digite o texto ..."
                    />
                    <select value={lang} onChange={(e) => setLang(e.target.value)}>
                        <option value="pt">Português</option>
                        <option value="en">Inglês</option>
                        <option value="es">Espanhol</option>
                    </select>
                    <button type="submit">Adicionar novo texto</button>
                </form>
            )}
        </div>
    );
}

export default AddTask;
