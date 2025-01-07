import express, { Application } from 'express';
import tasksRoutes from './routes/tasksRoutes';

const app: Application = express();

// Middleware to allow the use of JSON in request bodies
app.use(express.json());

/**
 * Root endpoint that checks if the API is running.
 * 
 * When a GET request is made to the root URL, it returns a simple JSON response 
 * indicating that the API is up and running.
 * 
 * Example Response:
 * {
 *   "message": "API is running"
 * }
 */
app.get('/', (req, res) => {
  return res.json({ message: "API is running" });
});

/**
 * Tasks routes mounted under '/tasks'.
 * 
 * The '/tasks' path uses a set of task-related routes imported from the 
 * 'tasksRoutes' module. These routes handle the operations related to 
 * tasks (e.g., creating, updating, retrieving, deleting tasks).
 * 
 * The routing is modular, allowing the task-related logic to be managed
 * separately in the 'tasksRoutes' module.
 */
app.use('/tasks', tasksRoutes);

// Exporting the app to be used in other files
/**
 * The app is exported as the default export, which allows it to be used
 * in other parts of the application, such as in the main server file where 
 * the app will be configured and run.
 */
export default app;
