# Aplicação PHP com DevOps na Prática

Este repositório contém uma aplicação web To Do List simples desenvolvida usando PHP, Bootstrap, JavaScript (JS), jQuery e PostgreSQL. A aplicação é configurada para ser executada em um ambiente Dockerizado usando Docker Compose como parte de um projeto da disciplina de DevOps na prática.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tenha instalado os seguintes componentes em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Executando a Aplicação

Siga as etapas abaixo para executar a aplicação em seu ambiente local:

1. Clone este repositório em sua máquina:

   git clone https://github.com/Arthss/atividadeDocker.git
   cd ToDoList

2. Dentro da pasta raiz do projeto, execute o comando abaixo para montar as imagens, containers, volumes e redes do docker:

   docker-compose up -d

3. O comando acima já inicia a aplicação quando finalizado, acesse sua aplicação por meio do http://localhost:80 na porta 80

## Estrutura do Projeto

   A estrutura de diretórios deste projeto é organizada da seguinte forma:
   
   ToDoList/: Contém o código-fonte da aplicação PHP.
   Assets/: Contém a pasta para os arquivos JS e CSS usados pela aplicação além da pasta dos Ícones.
   cria_tabela_tarefas.sql/: Contém o script SQL para a criação da tabela tarefas no banco de dados PostgreSQL que é usada pela aplicação.
   ToDoList/dockerfile/: Define a montagem da imagem docker da aplicação ToDoList
   ToDoList/docker-compose.yml: Define a configuração do ambiente Docker.
   README.md: Este arquivo README.

## Referências

1. Utilizado o exemplo 4 do site https://mdbootstrap.com/docs/standard/extended/to-do-list como inspiração para o front da aplicação
2. A aplicação e a integração com o docker feitas com a ajuda do Chat GPT e consulta a documentação do Docker e seus fóruns
3. Os ícones utilizados na aplicação foram retirados do site https://icons8.com.br/icons

