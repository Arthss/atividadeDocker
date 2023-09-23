<?php
    extension_loaded('pgsql') or die('A extensão PostgreSQL não está habilitada no PHP.');

    $host = "db";
    $port = '5432';    
    $dbname = 'meu_db'; 
    $user = 'postgres';  
    $password = '1234'; 

    $connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
    if (!$connection) {
        die("Falha na conexão com o banco de dados: " . pg_last_error());
    }

    $query = "SELECT id, INITCAP(descricao) as descricao, realizada FROM public.tarefas ORDER BY id";

    $resultado = pg_query($connection, $query);

    $data = [];
    
    while ($row = pg_fetch_assoc($resultado)) {
        $data[] = $row;
    }

    $listaTarefas = "";
    foreach($data as $dado){
        $classe = $dado["realizada"] == 't' ? 'class="text-decoration-line-through"' : '';
        $marcado = $dado["realizada"] == 't' ? 'checked' : '';
        $listaTarefas .= '<li class="list-group-item row d-flex border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" id="lista_tarefa_' .$dado["id"] . '" >
                            <div class="d-flex align-items-center col-md-10">
                                <input class="form-check-input me-2" type="checkbox" id="tarefa_' .$dado["id"] . '" onclick="riscarTarefa(' . $dado["id"] . ')"' . $marcado . '/>
                                <span id="texto_tarefa_' .$dado["id"] . '"' . $classe . '>' .$dado["descricao"] . '</span>
                            </div>
                            <a href="#!" data-mdb-toggle="tooltip" title="Editar Item" class="col-md-1">
                                <img src="Assets/Icones/editar.png" alt="Ícone de Edição" onclick="editarTarefa(' . $dado["id"] . ')">
                            </a>
                            <a href="#!" data-mdb-toggle="tooltip" title="Remover Item" class="col-md-1">
                                <img src="Assets/Icones/lixo.png" alt="Ícone de Remoção" onclick="removerTarefa(' . $dado["id"] . ')">
                            </a>
                        </li>';
    }

    pg_close($connection);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To Do List</title>
    <!-- Arquivos JS para tela -->
    <script src="Assets/JS/BootstrapJs.js"></script>
    <script src="Assets/JS/jQuery.js"></script>
    <script src="Assets/JS/SweetAlert.js"></script>
    <script defer src="Assets/JS/index.js"></script>

    <!-- Arquivos CSS para tela -->
    <link rel="stylesheet" href="Assets/CSS/SweetAlert.css">
    <link rel="stylesheet" href="Assets/CSS/Bootstrap.css">

</head>
<body>
    <section class="vh-100" style="background-color: #e2d5de;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body p-5">

                            <h3 class="mb-3">Bem vindo ao seu To Do List</h3>

                            <form class="d-flex justify-content-center align-items-center mb-4" autocomplete="off">
                                <div class="form-outline flex-fill">
                                    <input type="text" id="novaTarefa" class="form-control form-control-lg" placeholder="O que você precisa hoje?"/>
                                </div>
                                <button type="button" class="btn btn-primary btn-lg ms-2" onclick="enviarTarefa()">Adicionar</button>
                            </form>

                            <ul class="list-group mb-0">
                                <?= $listaTarefas ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>
