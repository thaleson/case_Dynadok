import { Router, Request, Response } from "express";
import { TasksRepository } from "../repositories/tasksRepository";

const router = Router();
const tasksRepository = new TasksRepository();

/**
 * POST: Creates a task and requests a summary from the Python service.
 * 
 * This endpoint accepts a `text` and `lang` in the request body, validates the input,
 * creates a new task, requests a summary from the Python service, and then updates 
 * the task with the generated summary.
 * 
 * The `lang` must be one of the supported languages: "pt", "en", or "es". If the 
 * language is not supported or the `text` is missing, it will return a 400 error 
 * with a relevant message.
 * 
 * On successful task creation, a 201 status is returned with the created task 
 * and a success message.
 * 
 * @param req - The request object containing the body data (`text` and `lang`).
 * @param res - The response object for sending the result back to the client.
 * @returns {Response} - The response with the result of the task creation process.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;
    
    // Validate input data
    if (!text) {
      return res.status(400).json({ error: 'Campo "text" é obrigatório.' });
    }
    if (!lang || !['pt', 'en', 'es'].includes(lang)) {
      return res.status(400).json({ error: 'Idioma não suportado. Use "pt", "en" ou "es".' });
    }

    // Create the task with language
    const task = tasksRepository.createTask(text, lang);

    // Request task summary from Python service (mocked here)
    const summary = "Resumo da tarefa"; // Placeholder for actual summary service call

    // Update the task with the summary
    tasksRepository.updateTask(task.id, summary);

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: tasksRepository.getTaskById(task.id),
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao criar a tarefa." });
  }
});

/**
 * GET: Lists all tasks.
 * 
 * This endpoint retrieves and returns all tasks stored in the task repository.
 * 
 * @param req - The request object.
 * @param res - The response object for sending the result back to the client.
 * @returns {Response} - The response containing a list of all tasks.
 */
router.get("/", (req: Request, res: Response) => {
  const tasks = tasksRepository.getAllTasks();
  return res.json(tasks);
});

/**
 * DELETE: Deletes a task by its ID.
 * 
 * This endpoint deletes a specific task by its `id`. It first validates that the 
 * `id` is a valid number. If the task with the given `id` exists, it is deleted. 
 * If the task is successfully deleted, a 200 status is returned with a success message.
 * If the task is not found, a 404 status with an error message is returned.
 * 
 * @param req - The request object containing the `id` parameter.
 * @param res - The response object for sending the result back to the client.
 * @returns {Response} - The response indicating whether the task was deleted successfully or not.
 */
router.delete("/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10); // Convert the ID to a number
  
  // Validate the ID
  if (isNaN(taskId)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  const taskDeleted = tasksRepository.deleteTask(taskId);
  
  if (taskDeleted) {
    return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
  } else {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }
});

export default router;
