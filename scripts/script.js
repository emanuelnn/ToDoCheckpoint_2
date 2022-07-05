document.getElementById("confirm").disabled = true;

function Validacoes() {
    /* DEFININDO VARIÁVEIS */
    let nome = document.querySelector("#name").value
    let sobrenome = document.querySelector("#sub_name").value
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#password").value
    let confSenha = document.querySelector("#confirm_password").value
    let resultado = document.querySelector("#resultado")

    if (nome != "" || sobrenome != "" || email != "" || senha != "") {
        /*VALIDAÇÃO DO NOME SENDO: SE QUANTIDADE DE LETRAS FOR INFERIOR A 3 OU SUPERIOR A 20 = ERRO*/
        if (nome.length < 3 || nome.length > 20) {
            resultado.innerHTML = `Preencha seu nome Corretamente! \n (Máximo de Caracreres: 20)`
        } else {
            resultado.innerHTML = ""
            /* VALIDAÇÃO DO SOBRENOME SENDO: SE QUANTIDADE DE LETRAS FOR INFERIOR A 3 ENTÇÃO = ERRO */
            if (sobrenome != "") {
                if (sobrenome.length < 3) {
                    resultado.innerHTML = "Preencha seu Sobrenome Corretamente!"
                } else {
                    resultado.innerHTML = ""
                    /* VALIDAÇÃO DE EMAIL */
                    if (email != "") {
                        var re = /\S+@\S+\.\S+/;
                        if (re.test(email) == true) {
                            resultado.innerHTML = ""
                            /* VALIDAÇÃO DE SENHA SENDO:
                    1 - SE SENHA TIVER MENOS QUE 8 CARACTERES = ERRO
                    2 - SE SENHA DE CONFIRMAÇÃO FOR DIFERENTE =  ERRO */
                            if (senha != "") {
                                if (senha != "" && confSenha != "") {
                                    if (senha.length == confSenha.length) {
                                        if (senha.length < 8) {
                                            resultado.innerHTML = "Senha não pode conter menos que 8 Caracteres!"
                                        } else if (senha == confSenha) {
                                            /*resultado.innerHTML = "Senhas Coincidem!" */
                                            resultado.innerHTML = ""
                                            /*CONFIRMAR VALIDAÇÕES E INSERIR DADOS NO OBJETO */
                                            var formData = {
                                                firstName: document.querySelector("#name").value,
                                                lastName: document.querySelector("#sub_name").value,
                                                email: document.querySelector("#email").value,
                                                password: document.querySelector("#password").value
                                            }
                                            teste(formData)

                                        } else { resultado.innerHTML = "Senhas Não Coincidem!" }
                                    } else { resultado.innerHTML = "Senhas Não Coincidem!" }
                                }
                            }
                        } else { resultado.innerHTML = "Insira um endereço de E-mail válido!" }
                    }
                }
            }
        }
    } else {
        alert("Preencha todos os Campos!")
        document.getElementById("name").style.borderBlockColor = "rgb(165, 42, 42)";
        document.getElementById("sub_name").style.borderBlockColor = "rgb(165, 42, 42)";
        document.getElementById("email").style.borderBlockColor = "rgb(165, 42, 42)";
        document.getElementById("password").style.borderBlockColor = "rgb(165, 42, 42)";
        document.getElementById("confirm_password").style.borderBlockColor = "rgb(165, 42, 42)";
        document.getElementById("name").style.borderRadius = "2em"
        resultado.innerHTML = "Preencha os Campos Obrigatórios!"
    }
}

function teste(Data) {
    alert(Data.firstName)
}

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

                    if (response.ok) {
                        document.querySelector("#resultado").value = "Sucesso!"
                    } else {

                        if (success === 'El usuario ya se encuentra registrado') {

                            alert('O e-mail digitado ja esta cadastrado')

                        }

                    }

                }

            )


        }

    )
}


