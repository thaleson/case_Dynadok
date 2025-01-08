import { writeFileSync, readFileSync, existsSync } from 'fs';

interface Task {
    id: string;
    text: string;
    summary: string;
    lang: string;
    translatedText: string;
}

export class TasksRepository {
    createTask(text: any, lang: any) {
        throw new Error("Method not implemented.");
    }
    updateTask(id: any, summary: any, translated_text: any) {
        throw new Error("Method not implemented.");
    }
    getAllTasks() {
        throw new Error("Method not implemented.");
    }
    private tasks: Task[] = [];
    private filePath = './tasks.json';

    constructor() {
        if (existsSync(this.filePath)) {
            const data = readFileSync(this.filePath, 'utf-8');
            this.tasks = JSON.parse(data);
        }
    }

    private saveToFile() {
        writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
    }

    addTask(text: string, summary: string, lang: string, translatedText: string): Task {
        const task: Task = {
            id: (this.tasks.length + 1).toString(),
            text,
            summary,
            lang,
            translatedText
        };
        this.tasks.push(task);
        this.saveToFile();
        return task;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return false;
        }
        this.tasks.splice(index, 1);
        this.saveToFile();
        return true;
    }
}
