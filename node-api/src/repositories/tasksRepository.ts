interface Task {
  lang(lang: any): unknown;
  id: number;
  text: string;
  summary: string | null;
}

export class TasksRepository {
  private tasks: Task[] = [];
  private currentId: number = 1;

  /**
   * Creates a new task.
   * 
   * This method creates a new task with the provided text and a unique id. The task's summary
   * is initialized as `null`. The task is then added to the internal task list.
   * 
   * @param text - The text for the task to be created.
   * @param lang - The language of the task (not directly used in this method, but could be useful for future implementations).
   * @returns {Task} - The created task with a unique id.
   */
  createTask(text: string, lang: any): Task {
    const task: Task = {
      id: this.currentId++,
      text,
      summary: null,
      lang: function (lang: any): unknown {
        throw new Error("Function not implemented.");
      }
    };
    this.tasks.push(task);
    return task;
  }

  /**
   * Updates an existing task with the generated summary.
   * 
   * This method finds the task by `id` and updates its `summary` field with the provided summary. 
   * If the task is found, it is returned with the updated summary. Otherwise, it returns `null`.
   * 
   * @param id - The id of the task to be updated.
   * @param summary - The summary to be assigned to the task.
   * @returns {Task | null} - The updated task or `null` if the task is not found.
   */
  updateTask(id: number, summary: string): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].summary = summary;
      return this.tasks[taskIndex];
    }
    return null;
  }

  /**
   * Retrieves a specific task by id.
   * 
   * This method finds the task by its `id` and returns it. If the task is not found, it returns `null`.
   * 
   * @param id - The id of the task to be retrieved.
   * @returns {Task | null} - The found task or `null` if not found.
   */
  getTaskById(id: number): Task | null {
    return this.tasks.find((t) => t.id === id) || null;
  }

  /**
   * Retrieves all tasks.
   * 
   * This method returns the complete list of tasks stored in the repository.
   * 
   * @returns {Task[]} - An array containing all tasks.
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Deletes a task by id.
   * 
   * This method attempts to find and remove the task with the given `id`. If a task is removed,
   * it returns `true`; otherwise, it returns `false`.
   * 
   * @param id - The id of the task to be deleted.
   * @returns {boolean} - Returns `true` if a task was deleted, or `false` if no task was found.
   */
  deleteTask(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id); // Filters out the task with the provided id
    return this.tasks.length < initialLength; // Returns true if a task was removed
  }
}
