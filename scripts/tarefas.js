function logout() {
    window.location.href = "./index.html"
    // AO FAZER LOGOUT REMOVER DADOS DO SESSION STORAGE 
    sessionStorage.User = ""
}
function usuarioLoad() {
    //1 - VALIDAR SE NA SESSIONSTORAGE EXISTE UM USUÁRIO SALVO
    // * SE HOUVER = LOGIN OK

    // OBTER DA SESSIONSTORAGE O TOKEN DO USUÁRIO LOGADO
    var token = sessionStorage.User

    // CONFIGURAÇÃO DO HEADER DE AUTENTICAÇÃO PARA RODAR O GETME E OBTER NOME, SOBRENOME, EMAIL E ID DO USUÁRIO
    var headersAuthRequest = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }
    // O Fetch é responsável por fazer uma requisição para um back-end
    // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', { headers: headersAuthRequest }).then(
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
            } else {
                localStorage.clear()
                window.location.href = './index.html'
            }
        }
    )
    getListTarefas()
}









// obter lista de tarefas

// Função que Obtem as Tarefas
function getListTarefas() {
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImlkIjo1MSwiaWF0IjoxNjU3NDk0MzAwfQ.FigzR5SsyZrec6hgVkrNYtIXZvT-49hQ0qRfvV7uuOU"

    const headersAuthRequest = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', { headers: headersAuthRequest }).then(
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
                            <p>${task.createdAt}</p>
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

                        <p>${task.createdAt}</p>
                      </div>
                    </li>
                    `
                }}
                }
            )
        }
    )
}