CREATE TABLE IF NOT EXISTS public.tarefas
(
    id serial PRIMARY KEY,
    descricao text NOT NULL,
    realizada boolean NOT NULL
);
