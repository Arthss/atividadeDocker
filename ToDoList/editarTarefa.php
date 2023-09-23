<?php
    extension_loaded('pgsql') or die('A extensão PostgreSQL não está habilitada no PHP.');

    if(isset($_POST["idTarefa"])){
        $host = "db";
        $port = '5432';    
        $dbname = 'meu_db'; 
        $user = 'postgres';  
        $password = '1234'; 

        $connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
        if (!$connection) {
            die("Falha na conexão com o banco de dados: " . pg_last_error());
        }

        $tarefa = pg_escape_string($_POST['idTarefa']);
        $atualizacaoTarefa = pg_escape_string($_POST['atualizacaoTarefa']);

        $query = "UPDATE public.tarefas SET descricao = '{$atualizacaoTarefa}' WHERE id = {$tarefa}";

        $result = pg_query($connection, $query);

        if (!$result) {
            die("Erro ao atualizar a tarefa: " . pg_last_error());
        }

        pg_close($connection);

        echo "Tarefa atualizada com sucesso!";
    }
    else{
        echo "Erro ao atualizar a tarefa!";
    }
?>