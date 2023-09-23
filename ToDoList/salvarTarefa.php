<?php

    extension_loaded('pgsql') or die('A extensão PostgreSQL não está habilitada no PHP.');

    if(isset($_POST["tarefa"])){
        $host = "db";
        $port = '5432';    
        $dbname = 'meu_db'; 
        $user = 'postgres';  
        $password = '1234'; 

        $connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
        if (!$connection) {
            die("Falha na conexão com o banco de dados: " . pg_last_error());
        }

        $tarefa = pg_escape_string($_POST['tarefa']);
        $realizada = 'f';

        $query = "INSERT INTO public.tarefas (descricao, realizada) VALUES ('$tarefa', '$realizada')";

        $result = pg_query($connection, $query);

        if (!$result) {
            die("Erro ao inserir a tarefa: " . pg_last_error());
        }

        pg_close($connection);

        echo "Tarefa inserida com sucesso!";
    }
    else{
        echo "Erro ao salvar tarefa!";
    }

?>