function login() {
    let erro = "rgb(165, 42, 42)"
    let email = document.getElementById("inputEmail").value
    let alert = document.getElementById("alertPassword")
    if (email != "") {
        var re = /\S+@\S+\.\S+/;
        if (re.test(email) == true) {
            var emailLogin = document.getElementById("inputEmail").value
            var senhaLogin = document.getElementById("inputPassword").value

            var formData = {
                "email": emailLogin,
                "password": senhaLogin
            }

            var requestHeaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            // Variavel que irá conter o nosso objeto de configuração da requisição
                var requestPostConfiguration = {
                    method: 'POST',
                    headers: requestHeaders,
                    body: JSON.stringify(formData)
                }

            // O Fetch é responsável por fazer uma requisição para um back-end
            // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
            fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestPostConfiguration).then(
                response => {
                    response.json().then(
                        success => {
                            if (response.status == "201") {
                                // USUÁRIO LOGADO COM SUCESSO!! IR OPARA PAGINA DE TAREFAS
                                sessionStorage.setItem("User", success.jwt)
                                window.location.href = "./tarefas.html"
                            } else if (response.status == "400") {
                                // SENHA INCORRETA
                                document.getElementById("alertPassword").value = "Senha Incorreta"
                            } else if (response.status == "404") {
                                // USUÁRIO NÃO EXISTE
                                document.getElementById("alertPassword").value = "Usuário Não Existente"
                            }
                        }
                    )
                }
            )
        } else {
            document.getElementById("inputEmail").style.borderBlockColor = erro
            alert.innerHTML = "Insira um endereço de E-mail válido!"
        }
    }
}

function buttonDisable() {
    document.getElementById("acessar").style.backgroundColor = "rgb(156, 156, 156)"
    var email = document.getElementById("inputEmail");
    var senha = document.getElementById("inputPassword");
    var button = document.getElementById("acessar");
    button.disabled = true;
    if (email.value === "" || senha.value === "") {
        button.visible = true;
    } else {
        button.disabled = false;
        document.getElementById("acessar").style.backgroundColor = "rgb(12, 81, 185)"
    }
}


