function validacoes() {
    if (document.querySelector("#name").value.length < 2 || document.querySelector("#name").value.length > 20) {
        alert("Preencha seu nome Corretamente! (Máximo de Caracreres: 20)")
    } else if (document.querySelector("#sub_name").value.length < 2) {
        alert("Preencha seu Sobrenome Corretamente!")
    } else if (document.querySelector("#email").value.length < 2) {
        alert("Preencha seu E-mail Corretamente!")
    } else if (document.querySelector("#password").value.length < 8) {
        alert("Preencha sua senha Corretamente! (Mínimo de 8 caracteres)")
    } else if (document.querySelector("#confirm_password").value.length < 8) {
        alert("Preencha sua senha Corretamente! (Mínimo de 8 caracteres)")
    } else {
        if (document.querySelector("#password").value == document.querySelector("#confirm_password").value) {
            var formData = {
                firstName: document.querySelector("#name").value,
                lastName: document.querySelector("#sub_name").value,
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value
            }
            console.log(formData)
            alert("Registro Realizado com Sucesso!")
            document.getElementById("resultado").innerHTML = "Registro Realizado Com Sucesso!";
        } else { alert("Senhas Não Coincidem!") }
    }
}

function validar_password() {
    if (document.querySelector("#confirm_password").value != document.querySelector("#password").value) {
        document.querySelector("#resultado").value = "Senhas Coincidem!"
    } else document.querySelector("#resultado").value = "Senhas Não Coincidem!"
}


function push() {
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