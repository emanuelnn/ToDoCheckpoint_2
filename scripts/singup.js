function Validacoes() {
    /* DEFININDO VARIÁVEIS */
    let nome = document.querySelector("#name").value
    let sobrenome = document.querySelector("#sub_name").value
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#password").value
    let confSenha = document.querySelector("#confirm_password").value
    var resultado = document.querySelector("#resultado")
    let erro = "rgb(165, 42, 42)"
    let validado = "rgb(255, 255, 255)"
    let nameValided
    let subNameValided
    let emailValided
    let passwordValided


    /* -------------------------------------------------------------------------------------*/
    /*VALIDAÇÃO DE TODOS OS CAMPOS PREENCHIDOS, CASO HAJA ALGUM EM BRANCO = ERRO*/
    if (nome != "" && sobrenome != "" && email != "" && senha != "") {
    } else {
        alert("Preencha todos os Campos!")
        validarCampos(erro)
    }
    /* -------------------------------------------------------------------------------------*/
    /*VALIDAÇÃO DO NOME SENDO: SE QUANTIDADE DE LETRAS FOR INFERIOR A 3 OU SUPERIOR A 20 = ERRO*/
    if (nome.length < 3 || nome.length > 20) {
        resultado.innerHTML = `Preencha seu nome Corretamente! \n (Máximo de Caracreres: 20)`
        document.getElementById("name").style.borderBlockColor = erro
    } else {
        resultado.innerHTML = ""
        document.getElementById("name").style.borderBlockColor = validado
        nameValided = "confirmed"
    }
    /* -------------------------------------------------------------------------------------*/
    /* VALIDAÇÃO DO SOBRENOME SENDO: SE QUANTIDADE DE LETRAS FOR INFERIOR A 3 ENTÇÃO = ERRO */
    if (sobrenome != "") {
        if (sobrenome.length < 3) {
            resultado.innerHTML = "Preencha seu Sobrenome Corretamente!"
            document.getElementById("sub_name").style.borderBlockColor = erro
        } else {
            resultado.innerHTML = ""
            document.getElementById("sub_name").style.borderBlockColor = validado
            subNameValided = "confirmed"
        }
    }
    /* -------------------------------------------------------------------------------------*/
    /* VALIDAÇÃO DE EMAIL */
    if (email != "") {
        var re = /\S+@\S+\.\S+/;
        if (re.test(email) == true) {
            resultado.innerHTML = ""
            document.getElementById("email").style.borderBlockColor = validado
            emailValided = "confirmed"
        } else {
            document.getElementById("email").style.borderBlockColor = erro
            resultado.innerHTML = "Insira um endereço de E-mail válido!"
        }
    }

    /* -------------------------------------------------------------------------------------*/
    /* VALIDAÇÃO DE SENHA SENDO:
                            1 - SE SENHA TIVER MENOS QUE 8 CARACTERES = ERRO
                              2 - SE SENHA DE CONFIRMAÇÃO FOR DIFERENTE =  ERRO */
    if (senha != "") {
        if (confSenha == "") {
            document.getElementById("confirm_password").style.borderBlockColor = validado
            resultado.innerHTML = "Confirme sua Senha!"
        } else {
            if (senha != "" && confSenha != "") {
                if (senha.length == confSenha.length) {
                    if (senha.length < 8) {
                        document.getElementById("password").style.borderBlockColor = erro
                        resultado.innerHTML = "Senha não pode conter menos que 8 Caracteres!"
                    } else if (senha == confSenha) {
                        resultado.innerHTML = ""
                        document.getElementById("password").style.borderBlockColor = validado
                        document.getElementById("confirm_password").style.borderBlockColor = validado
                        passwordValided = "confirmed"
                        /*CONFIRMAR VALIDAÇÕES E INSERIR DADOS NO OBJETO */
                    } else {
                        resultado.innerHTML = "Senhas Não Coincidem!"
                        document.getElementById("password").style.borderBlockColor = erro
                        document.getElementById("confirm_password").style.borderBlockColor = erro
                    }
                } else {
                    resultado.innerHTML = "Senhas Não Coincidem!"
                    document.getElementById("password").style.borderBlockColor = erro
                    document.getElementById("confirm_password").style.borderBlockColor = erro
                }
            }
        }
    }

    if (nameValided == "confirmed" && subNameValided == "confirmed" && emailValided == "confirmed" && passwordValided == "confirmed") {
        var formData = {
            firstName: document.querySelector("#name").value,
            lastName: document.querySelector("#sub_name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        push(formData)
    }
}

/* -------------------------------------------------------------------------------------*/
function push(dados) {
    var requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // Variavel que irá conter o nosso objeto de configuração da requisição
    var requestPostConfiguration = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(dados)
    }
    // O Fetch é responsável por fazer uma requisição para um back-end
    // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestPostConfiguration).then(

        response => {

            response.json().then(

                success => {
                    console.log(`Mensagem do Console:${response}`)
                    console.log(response)
                    console.log(`Mensagem do Console:${success}`)
                    console.log(success)
                    if (response.status == "201") {
                        document.querySelector("#resultado").value = "Sucesso!"
                        console.log(response)
                        alert("Cadastrado!")
                        window.location.href = "/index.html"
                    } else {

                        if (success === 'El usuario ya se encuentra registrado') {
                            document.querySelector("#resultado").value = 'O e-mail digitado já esta cadastrado'
                        }
                    }
                }
            )
        }
    )
}

function clean() {
    document.querySelector("#name").value = ""
    document.querySelector("#sub_name").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
    document.querySelector("#confirm_password").value = ""
}


function validarCampos(color) {
    document.getElementById("name").style.borderBlockColor = color;
    document.getElementById("sub_name").style.borderBlockColor = color;
    document.getElementById("email").style.borderBlockColor = color;
    document.getElementById("password").style.borderBlockColor = color;
    document.getElementById("confirm_password").style.borderBlockColor = color;
    document.getElementById("name").style.borderRadius = "2em"
    resultado.innerHTML = ""
}

