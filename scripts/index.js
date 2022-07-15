var serverAPI = "https://ctd-fe2-todo-v2.herokuapp.com/v1"


function login() {
    let loading = document.getElementById("loading");
    loading.style.display = '';
    let erro = "rgb(165, 42, 42)"
    let email = document.getElementById("inputEmail").value
    let passwordVerify = document.getElementById("inputPassword").value
    let alert = document.getElementById("alertPassword")

    if (email != "") {
        //Validação do E-mail
        var re = /\S+@\S+\.\S+/;
        if (re.test(email) == true) {
            var emailLogin = document.getElementById("inputEmail").value
            var senhaLogin = document.getElementById("inputPassword").value

            //Cria body para envio à API
            var formData = {
                "email": emailLogin,
                "password": senhaLogin
            }

            var requestHeaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            var requestPostConfiguration = {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(formData)
            }

            fetch(`${serverAPI}/users/login`, requestPostConfiguration).then(
                response => {
                    response.json().then(
                        success => {
                            console.log(success)
                            console.log(response)
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
            alert.innerHTML = "Digite Seus Dados Corretamente"
            let loading = document.getElementById("loading");
            loading.style.display = 'none';
        }
    }
}

function buttonDisable() {
    let loading = document.getElementById("loading");
    loading.style.display = 'none';
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


