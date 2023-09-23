$(document).ready(function() {
    $('#novaTarefa').keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            enviarTarefa();
        }
    });
    
});

function riscarTarefa(idTarefa){
    if ($("#tarefa_" + idTarefa).prop("checked")) {
        $.ajax({
            type: "POST",
            url: "statusTarefa.php",
            data: { idTarefa: idTarefa, status: "t"},
            success: function(response) {
                $("#texto_tarefa_" + idTarefa).addClass('text-decoration-line-through');
            },
            error: function(xhr, textStatus, errorThrown) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Erro ao atualizar o status da tarefa.",
                    confirmButtonColor: "#007BFF",
                    confirmButtonText: "OK"
                });
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "statusTarefa.php",
            data: { idTarefa: idTarefa, status: "f"},
            success: function(response) {
                $("#texto_tarefa_" + idTarefa).removeClass('text-decoration-line-through');
            },
            error: function(xhr, textStatus, errorThrown) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Erro ao atualizar o status da tarefa.",
                    confirmButtonColor: "#007BFF",
                    confirmButtonText: "OK"
                });
            }
        });
    }
}

function enviarTarefa() {
    let novaTarefa = $("#novaTarefa").val();

    if (novaTarefa.trim() !== "") {
        Swal.fire({
            title: 'Confirmação',
            text: 'Você tem certeza de que deseja adicionar esta tarefa?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#007bff', 
            cancelButtonColor: '#dc3545'   
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "salvarTarefa.php",
                    data: { tarefa: novaTarefa },
                    success: function(response) {
                        $("#novaTarefa").val("");
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso",
                            text: "Tarefa inserida com sucesso!",
                            confirmButtonColor: "#007BFF",
                            confirmButtonText: "OK"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        });
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        Swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Erro ao executar o cadastro",
                            confirmButtonColor: "#007BFF",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Campo Vazio',
            text: 'Por favor, insira uma tarefa.',
            icon: 'error',
            confirmButtonColor: '#007bff'
        });
    }
}

function removerTarefa(idTarefa) {

    Swal.fire({
        title: 'Você tem certeza?',
        text: 'Esta ação irá remover permanentemente a tarefa selecionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff', 
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim, remover!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST', 
                url: 'removerTarefa.php', 
                data: { idTarefa: idTarefa }, 
                success: function(response) {
                    $('#lista_tarefa_' + idTarefa).remove();
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "A tarefa foi removida com sucesso.",
                        confirmButtonColor: "#007BFF",
                        confirmButtonText: "OK"
                    });
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Ocorreu um erro ao remover a tarefa: " + error,
                        confirmButtonColor: "#007BFF",
                        confirmButtonText: "OK"
                    });
                }
            });
        }
    });
}

function editarTarefa(idTarefa) {

    Swal.fire({
        title: 'Atualizar Tarefa',
        html: `
            <div class="form-group">
                <label for="atualizacaoTarefa" class="text-dark">Tarefa Atual:</label>
                <p class="form-control" id="texto_tarefa_${idTarefa}">${$("#texto_tarefa_" + idTarefa).html()}</p>
            </div>
            <div class="form-group">
                <label for="atualizacaoTarefa" class="text-dark">Insira a atualização da tarefa:</label>
                <input type="text" class="form-control" id="atualizacaoTarefa">
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#007bff', 
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim, atualizar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        let atualizacaoTarefa = $("#atualizacaoTarefa").val()
        if (result.isConfirmed) {
            console.log(atualizacaoTarefa)
            if(atualizacaoTarefa != ''){
                Swal.fire({
                    title: 'Você tem certeza?',
                    text: 'Esta atualizar a tarefa permanentemente.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#007bff', 
                    cancelButtonColor: '#dc3545',
                    confirmButtonText: 'Sim, atualizar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST', 
                            url: 'editarTarefa.php', 
                            data: { atualizacaoTarefa: atualizacaoTarefa, idTarefa: idTarefa }, 
                            success: function(response) {
                                $("#texto_tarefa_" + idTarefa).html(atualizacaoTarefa)
                                Swal.fire({
                                    icon: "success",
                                    title: "Sucesso",
                                    text: "A tarefa foi atualizada com sucesso.",
                                    confirmButtonColor: "#007BFF",
                                    confirmButtonText: "OK"
                                });
                            },
                            error: function(xhr, status, error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Erro",
                                    text: "Ocorreu um erro ao atualizar a tarefa: " + error,
                                    confirmButtonColor: "#007BFF",
                                    confirmButtonText: "OK"
                                });
                            }
                        });
                    }
                });
            }
            else{
              Swal.fire({
                  title: 'Campo Vazio',
                  text: 'Por favor, insira uma a atualização da tarefa.',
                  icon: 'error',
                  confirmButtonColor: '#007bff'
              });
            }
        }
    });
}