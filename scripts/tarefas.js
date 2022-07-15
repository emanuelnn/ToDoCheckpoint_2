// URL DO SERVIDOR (API)
const serverAPI = "https://ctd-fe2-todo-v2.herokuapp.com/v1"


// OBTER DA SESSIONSTORAGE O TOKEN DO USUÁRIO LOGADO
const token = sessionStorage.User;

const headersAuthRequest = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }

function logout() {
    // AO FAZER LOGOUT RETORNAR PARA INDEX 
    window.location.href = "./index.html"
    // AO FAZER LOGOUT REMOVER DADOS DO SESSION STORAGE 
    sessionStorage.User = ""
}

//======================================================================================================================== Carregar Dados do usuário e Tasks

function usuarioLoad() {
    fetch(`${serverAPI}/users/getMe`, { headers: headersAuthRequest }).then(
        response => {
            if (response.ok) {
                response.json().then(
                    user => {
                        document.getElementById("usuario").innerHTML = `${user.firstName} ${user.lastName}`
                    }
                )
            } else {
                localStorage.clear()
                window.location.href = './index.html'
            }
        }
    )
// Carregar Tarefas após página carregada
    getListTarefas()
}
//========================================================================================================================


//======================================================================================================================== criar nova Task
function criarTask() {
    let task = document.getElementById("novaTarefa").value
    if (task != "") {

        let newTask = {
            'description': JSON.stringify(task),
            'completed': false
        }

        var requestPostConfiguration = {
            method: 'POST',
            headers: headersAuthRequest,
            body: JSON.stringify(newTask)
        }


        fetch(`${serverAPI}/tasks`, requestPostConfiguration).then(
            response => {
                response.json().then(
                    tasks => {
        alert ("Task Criada com Sucesso!")
                window.location.href = "./tarefas.html"

                    }
                )
            }
        )
    } else { alert("Insira uma Nova Tarefa!") }
}
//========================================================================================================================



//======================================================================================================================== Obter Lista Das Tarefas
function getListTarefas() {

    fetch(`${serverAPI}/tasks`, { headers: headersAuthRequest }).then(
        response => {
            response.json().then(
                tasks => {
                    for (let task of tasks) {
                        if (task.completed != true) {
                            document.getElementById('tarefas-pendentes').innerHTML += `
                        <li class="tarefa">
                          <div onclick="inputTask(${task.id})" class="not-done"></div>
                          <div class="descricao"><input  class="task" id=${task.id} value=${task.description}>
                            <p class="nome">Nova tarefa</p>
                            <p class="dataVal">Criada Em: ${dataAtualFormatada(task.createdAt)}</p>
                            <div>
                            <button id="B${task.id}" onclick="inputEditTask(${task.id})">Enviar</button>
			    <button onclick="TaskConcluida(${task.id})">Concluir</button>
                            <button onclick="deletarTask(${task.id})">Deletar</button>
                           </div>
                        </div>
                    </li>
                        `
                            let button = document.getElementById(`B${task.id}`)
                            var input = document.getElementById(task.id);
                            input.disabled = true;
                            button.style.display = 'none';

                        } else {
                            document.getElementById('tarefas-terminadas').innerHTML += `
                    <li class="tarefa">
                      <div class="not-done"></div>
                      <div class="descricao"><p>${task.description}</p>
                        <p>${dataAtualFormatada(task.createdAt)}</p>
                        <div>
			<button onclick="reabrirTask(${task.id})">Retornar</button>
                        <button onclick="deletarTask(${task.id})">Deletar</button>
                        </div>
                        </div>
                    </li>
                    `
                        }
                    }
                }
            )
        }
    )
}


//======================================================================================================================== Função para Tornar Editável o input de uma tarefa
function inputTask(id) {
    let button = document.getElementById(`B${id}`)
    let input = document.getElementById(id)
    input.disabled = false;
    button.style.display = '';
}

//======================================================================================================================== Função para Editar Tasks
function inputEditTask(id) {
    let input = document.getElementById(id).value
    if (input != "") {
        var newTask = {
            "description": JSON.stringify(input),
            "completed": false
        }
        let metodo = "PUT"
        pushData(id, newTask, metodo)
    }
}

//======================================================================================================================== Função para Concluir uma Task
function TaskConcluida(id) {
    var newTask = {
        "completed": true
    }
    let metodo = "PUT"
    pushData(id, newTask, metodo)
}


//======================================================================================================================== Função para Reabrir uma Task
function reabrirTask(id) {
    let newTask = {
        "completed": false
    }
    let metodo = "PUT"
    pushData(id, newTask, metodo)
}

//======================================================================================================================== Função para Deletar uma Task
function deletarTask(id) {
    let newTask = {
        'description': "",
        'completed': false
    }

    let metodo = "DELETE"
    pushData(id, newTask, metodo)
}

//========================================================================================================================
function pushData(id, newTask, metodo) {

    var requestPostConfiguration = {
        method: metodo,
        headers: headersAuthRequest,
        body: JSON.stringify(newTask)
    }

    fetch(`${serverAPI}/tasks/${id}`, requestPostConfiguration).then(
        response => {
            response.json().then(
                tasks => {
                    window.location.href = "./tarefas.html"
                }
            )
        }
    )
}

// Função para fazer a formatação de data e hora

function dataAtualFormatada(dataValue) {
    let data = dataValue
    let ano = data.substring(0, 4)
    let mes = data.substring(5, 7)
    let dia = data.substring(8, 10)
    let hora = data.substring(11, 13)
    let minuto = data.substring(14, 16)
    return `${dia}/${mes}/${ano}`
}


////--------------------------------------------------------------------
