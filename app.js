const express = require('express');
const app = express();
const fs = require('fs');

// Deixando o node/express utilizar e ler arquivos html
app.use(express.urlencoded({extended: true}));

// Definindo pasta de bootstrap para ser utilizado
app.use("/",express.static("./node_modules/bootstrap/dist/"));

app.set('view engine', 'ejs');

// Roteando pagina inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Roteando pagina cadastro de trens
app.get('/trens', (req, res) => {
    res.render('trens');
});

// Para registrar Trens.
app.post('/registroTrens', (req, res) => {
    let Model = req.body.modelo;
    let IDcode = req.body.codigoID;
    let LineBelong = req.body.linha;
    let Status = req.body.status;
    let Classification = req.body.classificacao;
    // Declarar Dados.

    let trens = {
        "modelo": Model,
        "codeID": IDcode,
        "linhaP": LineBelong,
        "status": Status,
        "class": Classification
    }
    // Criar Objeto para conseguir passar todos os dados.

    gravarTrens(trens, () => {
        console.log("Gravar json completo.");
    })
});

// Roteando pagina cadastro de linhas
app.get('/linhas', (req, res) => {
    res.render('linhas');
});

// Para registrar Linhas
app.post('/registroLinha', (req, res) => {
    let NomeL = req.body.NomeLinha;
    let Stations = req.body.Estacoes;
    let Extension = req.body.Extensao;
    let Speed = req.body.Velocidade;
    let Load = req.body.Carga;
    let Hw = req.body.HW;
    let Trips = req.body.Viagens;
    let Passengerspers = req.body.MediaPassageiros;
    let EnergyUse = req.body.ConsumoEnergia; 
    // Declarar Dados.  
    
    let linhas = {
        "nomel": NomeL,
        "estacoes": Stations,
        "extensao": Extension,
        "velocidade": Speed,
        "carga": Load,
        "hw": Hw,
        "viagens": Trips,
        "mediapassageiros": Passengerspers,
        "consumoenergia": EnergyUse
    }
    // Criar Objeto para conseguir passar todos os dados.

    gravarLinhas(linhas, () => {
        console.log("Gravar json completo.");
    })
});

// Roteando pagina cadastro de estações
app.get('/estacoes', (req, res) => {
    res.render('estacoes');
});

// Para registrar Estações 
app.post('/registroEstacao', (req, res) => {
    let Nome = req.body.nome;
    let KLM = req.body.km;
    let FStation = req.body.LinhaPertence;
    // Declarar Dados.
    
    let estacao = {
        "nome": Nome,
        "km": KLM,
        "estacaof": FStation
    }
    // Criar Objeto para conseguir passar todos os dados.

    gravarEstacao(estacao, () => {
        console.log("Gravar json completo.");
    })
});

// Roteando pagina Cadastrados
app.get('/cadastrados', (req,res) => {
    res.render('cadastrados');
    let escolha = 
});


// Roteando pagina ocorrencias de trens
app.get('/ocoTrens', (req, res) => {
    res.render('ocoTrens');
});

// Roteando pagina ocorrencias de linhas
app.get('/ocoLinhas', (req, res) => {
    res.render('ocoLinhas');
});

// Roteando pagina ocorrencias de estações
app.get('/ocoEstacoes', (req, res) => {
    res.render('ocoEstacoes');
});

app.get('/historico', (req, res) => {
    res.render('historico');
});

app.post('/historico', (req, res) => {
    let 
})

app.get('/detalhes', (req, res) => {
    res.render('detalhes');
});
// Recebendo dados do Login
app.post('/login', (req, res) => {
    let email = req.body.loginEmail;
    let password = req.body.loginPassword;
    
    let user = {
        "email": email,
        "password": password
    }
    gravarUser(user, () => { // Passa a função `ler` como callback para ser chamada após `gravar`
        ler(() => {
            if(user.email == "stefanom24@gmail.com"){
                console.log('Login feito com sucesso!');
                res.redirect('/');
            }
        }) 
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado.');
});

// <<<<<< HEAD
// function gravarUser(user, callback){
// =======
// Funções para gravar e ler arquivos JSON
function gravar(user, callback){
// >>>>>>> 2f6ff10e8af0cb6908cf97d97a2fcdf5b1b6e23e
    const fs = require('fs');
    let loginFile;
    try {
        loginFile = require('./login.json');
    } catch (error) {
        loginFile = { users: [] }; // Cria um novo objeto se o arquivo não existir
    }
    loginFile.users.push(user);
    fs.writeFile('login.json', JSON.stringify(loginFile), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Gravado');
        callback(); // Chama `ler` somente após o arquivo ser gravado
    });
};

function gravarTrens(dados) {
    const fs = require('fs');
    let filejson;
    
    try {
        filejson = require('./registroTrens.json');
    } catch(error) {
        filejson = { data: [] }; // Cria um novo objeto se o arquivo não existir
    }
    filejson.data.push(dados);
    fs.writeFile("registroTrens.json", JSON.stringify(filejson), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Gravado com Sucesso');
    }) 

};

function gravarLinhas(dados) {
    const fs = require('fs');
    let filejson;
    
    try {
        filejson = require('./registroLinhas.json');
    } catch(error) {
        filejson = { data: [] }; // Cria um novo objeto se o arquivo não existir
    }
    filejson.data.push(dados);
    fs.writeFile("registroLinhas.json", JSON.stringify(filejson), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Gravado com Sucesso');
    }) 
};

function gravarEstacao(dados) {
    const fs = require('fs');
    let filejson;
    
    try {
        filejson = require('./registroEstacao.json');
    } catch(error) {
        filejson = { data: [] }; // Cria um novo objeto se o arquivo não existir
    }
    filejson.data.push(dados);
    fs.writeFile("registroEstacao.json", JSON.stringify(filejson), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Gravado com Sucesso');
    }) 
};


function ler(callback){
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

