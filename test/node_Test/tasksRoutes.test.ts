// test/node/tasksRoutes.test.ts

import request from 'supertest';
import app from '../../node-api/src/app'; // Supondo que seu servidor Express esteja em src/app.ts

describe('Tasks API', () => {
  let taskId: number;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        text: 'Texto de teste para a tarefa.',
        lang: 'pt',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Tarefa criada com sucesso!');
    taskId = response.body.task.id;
  });

  it('should get all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a task by ID', async () => {
    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taskId);
  });

  it('should delete a task by ID', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tarefa deletada com sucesso!');
  });
});
