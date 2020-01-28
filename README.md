# desafio-01-GoStack
[Node.js] Servidor simples utilizando o framework "express". :+1:

## Rotas
- **POST** _/projects_: Recebe um campo 'title' e cadastra um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] };

- **GET** _/projects_: Lista todos projetos e suas tarefas;

- **PUT** _/projects/:id_: Recebe um campo 'title' e altera apenas o título do projeto com o id presente nos parâmetros da rota;

- **DELETE** _/projects/:id_: Deleta o projeto com o id presente nos parâmetros da rota;

- **POST** _/projects/:id/tasks_: Recebe um campo 'title' e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;







####  


_Foram utilizados Middlewares para verificar a existência de projetos salvos e se os campos passados na requisição são válidos.
É exibido no console do servidor a contagem total de requisições recebidas._
