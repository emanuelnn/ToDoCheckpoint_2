//CÓDIGO PARA CRIAR NOVA TASK

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImlkIjo1MSwiaWF0IjoxNjU3NDk0MzAwfQ.FigzR5SsyZrec6hgVkrNYtIXZvT-49hQ0qRfvV7uuOU"
var dados = {
  'description': "teste de API",
  'completed': false
}
    const headersAuthRequest = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }
    
    var requestPostConfiguration = {
        method: 'POST',
        headers: headersAuthRequest,
        body: JSON.stringify(dados)
    }
    


    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestPostConfiguration).then(
      response => {
        response.json().then(
          tasks => {
            console.log(tasks)
          }
        )
      }
    )