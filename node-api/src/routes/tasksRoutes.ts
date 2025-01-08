/**
 * Express router for handling task-related API endpoints.
 * 
 * The router defines routes for creating, retrieving, and deleting tasks.
 * It communicates with a tasks repository and a Python service for text summarization.
 * 
 * @module tasksRouter
 */

import { Router, Request, Response } from 'express';
import { TasksRepository } from '../repositories/tasksRepository';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const router = Router();
const tasksRepo = new TasksRepository();

/**
 * POST endpoint for creating a new task.
 * 
 * The endpoint expects a JSON body with 'text' and 'lang' properties. 
 * It communicates with a Python service to summarize the text and returns the task with 
 * the original text, summary, and translated text.
 * 
 * @route POST /tasks
 * @param {string} req.body.text - The text to summarize.
 * @param {string} req.body.lang - The language of the text.
 * @returns {Task} The created task object.
 * @throws {400} If 'text' or 'lang' is missing, or if the language is not supported.
 * @throws {500} If there is an error communicating with the Python service.
 */



router.post('/', async (req: Request, res: Response) => {
    const { text, lang } = req.body;

    if (!text || !lang) {
        return res.status(400).json({ message: "Text and language are required" });
    }

    const supportedLangs = ['pt', 'en', 'es'];
    if (!supportedLangs.includes(lang)) {
        return res.status(400).json({ message: "Language not supported" });
    }

    try {
        const pythonServiceUrl = process.env.PYTHON_SERVICE_URL!;
        const pythonresponse = await axios.post(pythonServiceUrl, { text, lang });

        const { summary, translated_text } = pythonresponse.data;

        const task = tasksRepo.addTask(text, summary, lang, translated_text);
        res.status(201).json(task);
    } catch (error:any) {
        console.error("Error details:", error.response?.data || error.message);
        res.status(500).json({ message: "Error communicating with Python service" });
    }
});

/**
 * GET endpoint for retrieving all tasks.
 * 
 * @route GET /tasks
 * @returns {Task[]} An array of all tasks.
 */
router.get('/', (req: Request, res: Response) => {
    res.json(tasksRepo.getTasks());
});

/**
 * GET endpoint for retrieving a task by its ID.
 * 
 * @route GET /tasks/:id
 * @param {string} req.params.id - The ID of the task to retrieve.
 * @returns {Task} The task object if found.
 * @throws {404} If the task with the given ID is not found.
 */
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasksRepo.getTaskById(id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

/**
 * DELETE endpoint for deleting a task by its ID.
 * 
 * @route DELETE /tasks/:id
 * @param {string} req.params.id - The ID of the task to delete.
 * @returns {void} Returns a 204 status code if the task is deleted.
 * @throws {404} If the task with the given ID is not found.
 */
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const success = tasksRepo.deleteTask(id);

    if (!success) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
});

export default router;
