const apiUrl = 'https://ctd-fe2-todo-v2.herokuapp.com'
const createTaskButtonElement = document.querySelector('#createTaskButton')
const skeletonElement = document.querySelector('#skeleton')
var token = sessionStorage.User

// CONFIGURAÇÃO DO HEADER DE AUTENTICAÇÃO PARA RODAR O GETME E OBTER NOME, SOBRENOME, EMAIL E ID DO USUÁRIO
var headersAuthRequest = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
}
    
function logout() {
    window.location.href = "./index.html"
    // AO FAZER LOGOUT REMOVER DADOS DO SESSION STORAGE 
    sessionStorage.User = ""
}


function usuarioLoad() {
    //1 - VALIDAR SE NA SESSIONSTORAGE EXISTE UM USUÁRIO SALVO
    // * SE HOUVER = LOGIN OK
   
    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe', { headers: headersAuthRequest }).then(
        response => {
            if (response.ok) {
                response.json().then(
                    user => {
                        //OBJETO CONTENDO TODOS OS DADOS DO USUÁRIO
                        var UserData = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            id: user.id
                        }
                        document.getElementById("usuario").innerHTML = `${UserData.firstName} ${UserData.lastName}`
                    }
                )
//            } else {
//                localStorage.clear()
//                window.location.href = './index.html'
            }
        }
    )
    getListTarefas()
}

//============================================
//     Função para mostrar Nome do User
//   Função Duplicada: A função usuarioLoad já realiza o processo de buscar os dados do usário e inserir Nome e Sobrenome na página.
//============================================

function getUserInfo() {

    
    fetch(`${apiUrl}/users/getMe`, { headers: headersAuthRequest }).then(

        response => {

            if(response.ok) {

                response.json().then(

                    user => {

                        console.log(user)
                        console.log(`${user.firstName} ${user.lastName}`)

                        // !Insira a lógica aqui para mostrar o Nome Completo do usuário no HTML da Aplicação

                    }

                )

            } else {

                localStorage.clear()
                window.location.href = './../index.html'

            }

        }

    )

}

//============================================
//       Função que Obtem as Tarefas
// Função Duplicada, a função "getListTarefas" já realiza o processo de Obter as Tarefas e Inseri-las na página
//============================================
function getTasks() {

    fetch(`${apiUrl}/tasks`, { headers: headersAuthRequest }).then(

        response => {

            response.json().then(

                tasks => {

                    // Remoção dos itens que estavam antes dentro da Lista inicial
                    listTasks.innerHTML = ''

                    for(let task of tasks) {

                        console.log(task)

                        for(let task of tasks){

                            `
                                <li class="tarefa">
                                    <div class="not-done"></div>
                                    <div class="descricao">
                                        <p class="nome">NovaTarefa</p>
                                        <p class="timestamp">Criada em: 15/07/21</p>
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

if(token === null) {

    window.location.href = './../index.html'
} else {
    // getUserInfo()
  //  getTasks()
}


//============================================
//       Função que so deus sabe
// Função para obter as tarefas concluídas e pendentes.
//============================================
function getListTarefas() {

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', { headers: headersAuthRequest }).then(
        response => {
            response.json().then(
                tasks => {
                    if(tasks.completed = "false"){
                    for (let task of tasks) {
                        document.getElementById('tarefas-pendentes').innerHTML += `
                        <li class="tarefa">
                          <div class="not-done"></div>
                          <div class="descricao"><p>${task.description}</p>
                            <p class="nome">Nova tarefa</p>
                            <p>${FormatarData(task.createdAt)}</p>
                        </li>
                        `
                    }
                }else{
                    for (let task of tasks) {
                    document.getElementById('tarefas-terminadas').innerHTML += `
                    <ul class="tarefas-terminadas">
                    <div>
                    <li class="tarefa">
                      <div class="not-done"></div>
                      <div class="descricao"><p>${task.description}</p>

                        <p>${FormatarData(task.createdAt)}</p>
                      </div>
                    </li>
                    `
                }}
                }
            )
        }
    )
}


//============================================
//       Função que cria uma task
//============================================
function createTask() {

    // Objeto que será enviado para a API
    let data = {
        description: 'Tarefa Teste',
        completed: false
    }

    // Objeto que servira como Configuração da Requisição de POST
    let postRequestConfiguration = {
        method: 'POST',
        headers: headersAuthRequest,
        body: JSON.stringify(data)
    }

    fetch(`${apiUrl}/tasks`, postRequestConfiguration).then(

        response => {

            if(response.ok) {

                // !Inserir Lógica para obter as Tarefas Novamente

            }

        }

    )

}


//============================================
//  Event Listener do Botão para criar Task
//============================================
createTaskButtonElement.addEventListener('click', event => {

    event.preventDefault()

    // Chama a função que Cria uma Tarefa
    createTask()

})

//============================================
//         Datas Padrão Brasil
//============================================
let dataCriacao = new Date(task.createdAt)
let dataCriacaoFormatada = dataCriacao.toLocaleDateString(
    'pt-BR',
    {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
)

function FormatarData(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}
// parei a aula de 05/07 as 53:02
