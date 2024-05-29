function readJSON(arquivo){
    const fs = require('fs');
    fs.readFile('./login.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const login = JSON.parse(data);
        // Verifica se o caminho desejado existe antes de tentar acessá-lo
        if (login.users && login.users.length > 1) {
            console.log(login.users[1].email); // Supondo que você quer acessar o email do segundo usuário
        }  
    });
    callback();
};

function populateTable(c, config) {
    var values = config.values;
    var headers = config.headers;
    
    /* Limpa a tabela para adicionar novas informações */
    while(c.rows.length - 1 > 0) {
        c.deleteRow(1);
    }
    
    /* Define variáveis para criação das linhas e colunas */
    var row; var col;
    
    // Linhas
    for(var i = 0; i < values.length; i++) {
        var lastRow = c.rows.length;
        var iteration = lastRow;
        row = c.insertRow(lastRow);
        
        // Colunas
        for(var j = 0; j < headers.length; j++) {
            col = row.insertCell(j);
            col.style = headers[j].style;
            col.appendChild(document.createTextNode(values[i][headers[j].key]));
        }
    }
}