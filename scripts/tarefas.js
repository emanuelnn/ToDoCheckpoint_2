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
    var headerAuthRequest = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }

    // O Fetch é responsável por fazer uma requisição para um back-end
    // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', { headers: headerAuthRequest }).then(
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
}

