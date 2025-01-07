import { TasksRepository } from '../../node-api/src/repositories/tasksRepository';

describe('TasksRepository', () => {
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new TasksRepository(); // Instancia o repositório antes de cada teste
  });

  test('should create a task with text and lang', () => {
    const text = 'Texto da tarefa';
    const lang = 'pt'; // Idioma válido, como "pt", "en", ou "es"

    const task = tasksRepository.createTask(text, lang); // Chamando a função com 2 parâmetros

    // Verificar se a tarefa foi criada com sucesso
    expect(task).toHaveProperty('id');
    expect(task.text).toBe(text);
    expect(task.lang).toBe(lang);
    expect(task.summary).toBeNull(); // O resumo deve ser null inicialmente
  });

  test('should not create a task without text', () => {
    const lang = 'pt';

    // Tentar criar a tarefa sem o texto
    expect(() => tasksRepository.createTask('', lang)).toThrow('Texto é obrigatório!');
  });

  test('should not create a task with unsupported language', () => {
    const text = 'Texto da tarefa';
    const lang = 'de'; // Idioma não suportado

    // Tentar criar a tarefa com um idioma não suportado
    expect(() => tasksRepository.createTask(text, lang)).toThrow('Idioma não suportado!');
  });
});
