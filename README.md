# LLM Summarizer API

## 🚀 Visão Geral

Este projeto é uma **API Node.js** desenvolvida com **TypeScript** e **Express**, que permite aos usuários submeter textos e receber resumos gerados por um serviço Python utilizando **LangChain**. O resumo gerado é salvo junto com o texto original e a versão resumida, e traduzido conforme o idioma solicitado pelo usuário.

A API é composta por dois componentes principais:
1. **API Node.js**: Gerencia as rotas e a interação com o serviço Python para gerar os resumos.
2. **Serviço Python**: Responsável por gerar o resumo utilizando o LangChain.

---

## 🧑‍💻 Como Executar

### **Requisitos**
- **React**: Versão mais atual.
- **Node.js**: Versão 16 ou superior.
- **Python**: Versão 3.8 ou superior.
- **Git**: Para clonar o repositório.
- **pip**: Gerenciador de pacotes do Python.
- **npm**: Gerenciador de pacotes do Node.js.
- **Token Hugging Face**: [Gere aqui](https://huggingface.co/settings/tokens).


---

### 🔧 **Instalação no Linux**

1. Clone o repositório:
   ```bash
   git clone https://github.com/thaleson/case_Dynadok
   cd case_Dynadok
   ```

2. Dê permissão de execução para o script `setup.sh`:
   ```bash
   chmod +x setup.sh
   ```

3. Crie um arquivo `.env` na raiz do projeto e insira sua chave de API do Hugging Face:
   ```
   HF_TOKEN=SEU_TOKEN_AQUI
   ```

4. Instale as dependências:
   ```bash
   ./setup.sh install-node
   ./setup.sh install-python
   ```

5. Inicie os servidores:
   ```bash
   ./setup.sh dev-node
   ./setup.sh dev-python
   ```

6. Acesse a API Node em **http://localhost:3006**.
7. Acesse a API Python em **http://localhost:5001**.

---

### 🔧 **Instalação no Mac**

1. Certifique-se de ter o **Homebrew** instalado. Caso não tenha, instale com:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Instale as dependências:
   ```bash
   brew install git node python
   ```

3. Clone o repositório:
   ```bash
   git clone https://github.com/thaleson/case_Dynadok
   cd case_Dynadok
   ```

4. Crie um arquivo `.env` na raiz do projeto e insira sua chave de API do Hugging Face:
   ```
   HF_TOKEN=SEU_TOKEN_AQUI
   ```

5. Instale as dependências do projeto:
   ```bash
   ./setup.sh install-node
   ./setup.sh install-python
   ```

6. Inicie os servidores:
   ```bash
   ./setup.sh dev-node
   ./setup.sh dev-python
   ```

7. Acesse a API Node em **http://localhost:3006**.

8. Acesse a API Python em **http://localhost:5001**.

---

### 🔧 **Instalação no Windows**

1. **Pré-requisitos**:
   - Instale o [Git](https://git-scm.com/).
   - Instale o [Node.js](https://nodejs.org/).
   - Instale o [Python](https://www.python.org/).

2. Clone o repositório:
   Abra o **Git Bash** e execute:
   ```bash
   git clone https://github.com/thaleson/case_Dynadok
   cd case_Dynadok
   ```

3. Crie um arquivo `.env` na raiz do projeto e insira sua chave de API do Hugging Face:
   ```
   HF_TOKEN=SEU_TOKEN_AQUI
   ```

4. Instale as dependências do projeto:
   ```bash
   ./setup.sh install-node
   ./setup.sh install-python
   ```

5. Inicie os servidores:
   ```bash
   ./setup.sh dev-node
   ./setup.sh dev-python
   ```

6. Acesse a API Node em **http://localhost:3006**.

7. Acesse a API Python em **http://localhost:5001**.

---

## 🖥️ Front-End (React)

Este projeto também inclui um **front-end desenvolvido com React** que permite a interação do usuário com a API de resumos. O usuário pode enviar textos para serem resumidos e visualizar o resumo gerado pela API de forma intuitiva.

### **Estrutura do Front-End**
- **React**: Utilizado para construir a interface dinâmica e responsiva.
- **React Router**: Para navegação entre diferentes páginas, como a página inicial e a página de detalhes da tarefa.
- **Axios**: Biblioteca para fazer requisições HTTP à API e manipular dados.
- **State Management**: Utilização do **useState** e **useEffect** para gerenciar o estado da aplicação e realizar chamadas assíncronas.

### **Funcionalidades do Front-End**
1. **Página Inicial**: O usuário pode visualizar uma lista de tarefas (textos e resumos) já criadas, com a possibilidade de adicionar novas tarefas.
2. **Página de Detalhes**: O usuário pode visualizar os detalhes de uma tarefa específica, incluindo o texto original, o resumo gerado e o idioma para o qual o texto foi traduzido.
3. **Interatividade**: Navegação fácil entre as páginas, com feedback visual durante a criação das tarefas e exibição de dados carregados da API.

### **Como Iniciar o Front-End**
1. Instale as dependências do front-end:
   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

3. Acesse a aplicação front-end em **http://localhost:5173**.

### **Arquitetura de Componentes**
- **App.jsx**: Componente principal que gerencia as rotas e exibe a página inicial ou os detalhes das tarefas.
- **AddTask.jsx**: Componente que adicionar nova  task.
- **Tasks.jsx**: Componente que exibe a lista de tarefas.
- **TaskDetail.jsx**: Componente que exibe os detalhes de uma tarefa específica, buscando os dados da API.


---

## 🛠️ Endpoints da API

### **POST /tasks**:
- **Descrição**: Cria uma nova tarefa com o texto a ser resumido.
- **Parâmetros**:
  - `text`: Texto a ser resumido.
  - `lang`: Idioma para qual o texto original deve ser traduzido.
  - Idiomas suportados: `pt`, `en`, `es`.
- **Resposta**: Retorna um JSON com as propriedades:
  - `id`: Identificador da tarefa.
  - `text`: Texto original.
  - `summary`: Resumo gerado pelo serviço Python.
  - `lang`: Idioma para qual o texto foi traduzido.

### **GET /tasks**:
- **Descrição**: Lista todas as tarefas criadas.
- **Resposta**: Retorna um JSON com uma lista de tarefas.

### **GET /tasks/:id**:
- **Descrição**: Obtém o resumo de uma tarefa específica.
- **Resposta**: Retorna um JSON com as propriedades:
  - `id`: Identificador da tarefa.
  - `text`: Texto original.
  - `summary`: Resumo gerado pelo serviço Python.
  - `lang`: Idioma para qual o texto foi traduzido.

### **DELETE /tasks/:id**:
- **Descrição**: Remove uma tarefa.
- **Resposta**: Retorna um status de sucesso.

---

## 🧪 Testes

Este projeto inclui uma pasta chamada **`test`**, que contém os códigos utilizados para testar a funcionalidade da API. Todos os testes foram executados com sucesso, garantindo a estabilidade e a precisão do projeto.

---

## 🌍 Metodologias

- **Desenvolvimento Multiplataforma**: Compatível com **Linux**, **Windows** e **Mac**.
- **Microserviços**: Arquitetura que divide responsabilidades entre API Node.js e o serviço Python.
- **Ágil**: Projetado para facilitar mudanças e integrações futuras.

---

## 🎉 Conclusão

Esse projeto oferece uma integração eficiente entre Node.js e Python, utilizando LangChain para resumos textuais em múltiplos idiomas. O processo de instalação foi simplificado para diferentes sistemas operacionais, garantindo acessibilidade e flexibilidade. 
