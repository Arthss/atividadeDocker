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

3. O comando acima já inicia a aplicação assim que tudo já foi criado, acesse sua aplicação por meio do http://localhost:80 na porta 80

