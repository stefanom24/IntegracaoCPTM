const express = require("express");
const app = express();
const fs = require("fs");

// Deixando o node/express utilizar e ler arquivos html
app.use(express.urlencoded({ extended: true }));

// Definindo pasta de bootstrap para ser utilizado
app.use("/", express.static("./node_modules/bootstrap/dist/"));

app.set("view engine", "ejs");

// Roteando pagina inicial
app.get("/", (req, res) => {
  res.render("index");
});

// Roteando pagina cadastro de trens
app.get("/trens", (req, res) => {
  res.render("trens");
});

// Recebendo dados do cadastro de trens
app.post("/trens", (req, res) => {
  //Fazer toda logica de escrever para json.
});

// Roteando pagina cadastro de linhas
app.get("/linhas", (req, res) => {
  res.render("linhas");
});

// Roteando pagina cadastro de estações
app.get("/estacoes", (req, res) => {
  res.render("estacoes");
});

// Roteando pagina ocorrencias de trens
app.get("/ocoTrens", (req, res) => {
  res.render("ocoTrens");
});

// Roteando pagina ocorrencias de linhas
app.get("/ocoLinhas", (req, res) => {
  res.render("ocoLinhas");
});

// Roteando pagina ocorrencias de estações
app.get("/ocoEstacoes", (req, res) => {
  res.render("ocoEstacoes");
});

app.get("/historico", (req, res) => {
  res.render("historico");
});



app.get("/detalhes", (req, res) => {
  res.render("detalhes");
});

app.get("/index", (req, res) => {
  res.render("index");
});

// Recebendo dados do Login
app.post("/login", (req, res) => {
  let email = req.body.loginEmail;
  let password = req.body.loginPassword;

  let user = {
    email: email,
    password: password,
  };
  gravar(user, () => {
    // Passa a função `ler` como callback para ser chamada após `gravar`
    ler(() => {
      if (user.email == "stefanom24@gmail.com") {
        console.log("Login feito com sucesso!");
        res.redirect("/");
      }
    });
  });
});

// Para registrar Estações (Incompleto)
app.post("/registroEstacao", (req, res) => {
  let Nome = req.body.nome;
  let Blocks = req.body.blocos;
  let FStation = req.body.LinhaPertence;

  let estacao = {
    nome: Nome,
    blocos: Blocks,
    estacaof: FStation,
  };
  // Precisa gravar os dados
});

// Para registrar Linhas (Incompleto)
app.post("/registroLinha", (req, res) => {
  let NomeL = req.body.NomeLinha;
  let Stations = req.body.Estacoes;
  let Extension = req.body.Extensao;
  let Speed = req.body.Velocidade;
  let Load = req.body.Carga;
  let Hw = req.body.HW;
  let Trips = req.body.Viagens;
  let Passengerspers = req.body.MediaPassageiros;
  let EnergyUse = req.body.ConsumoEnergia;

  let linhas = {
    nomel: NomeL,
    estacoes: Stations,
    extensao: Extension,
    velocidade: Speed,
    carga: Load,
    hw: Hw,
    viagens: Trips,
    mediapassageiros: Passengerspers,
    consumoenergia: EnergyUse,
  };
  // Precisa gravar os dados
});

// Para registrar Trens (Incompleto)
app.post("/registroTrens", (req, res) => {
  let estacao = {};
  // Precisa gravar os dados
});

app.listen(10000, () => {
  console.log("Servidor iniciado.");
});

function gravar(user, callback) {
  const fs = require("fs");
  let loginFile;
  try {
    loginFile = require("./login.json");
  } catch (error) {
    loginFile = { users: [] }; // Cria um novo objeto se o arquivo não existir
  }
  loginFile.users.push(user);
  fs.writeFile("login.json", JSON.stringify(loginFile), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Gravado");
    callback(); // Chama `ler` somente após o arquivo ser gravado
  });
}

function ler(callback) {
  const fs = require("fs");
  fs.readFile("./login.json", "utf8", (err, data) => {
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
}

// Importações necessárias

const bodyParser = require("body-parser");
const path = require("path");

// Configuração básica do servidor
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Rota POST para registrar novas ocorrências

// Função genérica para gravar ocorrências
function gravarOcorrencia(novaOcorrencia, callback) {
  const filePath = path.join(__dirname, 'ocorrencias.json'); // Caminho para o arquivo JSON
  console.log("Lendo arquivo JSON:", filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return callback(false);
    }

    let ocorrencias = [];
    if (data) {
      try {
        ocorrencias = JSON.parse(data).ocorrencias || [];
        console.log("Ocorrências existentes:", ocorrencias);
      } catch (parseError) {
        console.error("Erro ao analisar os dados do JSON:", parseError);
        return callback(false);
      }
    }

    ocorrencias.push(novaOcorrencia); // Adiciona a nova ocorrência ao array existente
    console.log("Ocorrências atualizadas:", ocorrencias);

    fs.writeFile(filePath, JSON.stringify({ ocorrencias: ocorrencias }, null, 2), writeErr => {
      if (writeErr) {
        console.error("Falha ao salvar o arquivo atualizado:", writeErr);
        return callback(false);
      }
      console.log("Ocorrência salva com sucesso.");
      callback(true);
    });
  });
}

//LINHAS
app.post('/ocoLinhas', (req, res) => {
  const newOcorrencia = {
      data: req.body.data,
      horario: req.body.horario,
      linha: req.body.linha,
      estacao: req.body.estacao,
      bloco: req.body.bloco,
      inviabilizou_o_bloco: req.body.Inviabilizou_o_bloco == 'on',
      impacto_na_velocidade: req.body.Impacto_na_velocidade == 'on',
      descricao: req.body.descricao,
      tag:"Linha",
      codigo_trem: "",
      categoria: req.body.categoria,

  };

  console.log('Nova ocorrência recebida:', newOcorrencia);
  gravarOcorrencia(newOcorrencia, sucesso => {
    if (sucesso) {
      res.send("Ocorrência de linha registrada com sucesso!");
    } else {
      res.status(500).send("Erro ao atualizar o registro de ocorrências.");
    }
  });
});

//TRENS
app.post('/ocoTrens', (req, res) => {
  const newOcorrencia = {
      data: req.body.data,
      horario: req.body.horario,
      linha: req.body.linha,
      estacao: "",
      bloco: req.body.bloco,
      inviabilizou_o_bloco: req.body.Inviabilizou_o_bloco === 'on',
      impacto_na_velocidade: req.body.Impacto_na_velocidade === 'on',
      descricao: req.body.descricao,
      tag: "Trem",
      codigo_trem: req.body.codigo_trem,
      categoria: req.body.Categoria,
  };
  console.log('Nova ocorrência recebida:', newOcorrencia);
 
  gravarOcorrencia(newOcorrencia, sucesso => {
    if (sucesso) {
      res.send("Ocorrência de trem registrada com sucesso!");
    } else {
      res.status(500).send("Erro ao atualizar o registro de ocorrências.");
    }
  });
  
});

//ESTAÇÕES
app.post('/ocoEstacoes', (req, res) => {
  const newOcorrencia = {
      data: req.body.data,
      horario: req.body.horario,
      linha: req.body.linha,
      estacao: req.body.estacao,
      bloco: req.body.bloco,
      inviabilizou_o_bloco: req.body.Inviabilizou_o_bloco === 'on',
      impacto_na_velocidade: req.body.Impacto_na_velocidade === 'on',
      descricao: req.body.descricao,
      tag: "Estação",
      codigo_trem:"",
      categoria: req.body.Categoria,   
  };
  console.log('Nova ocorrência recebida:', newOcorrencia);

  gravarOcorrencia(newOcorrencia, sucesso => {
    if (sucesso) {
      res.send("Ocorrência de estação registrada com sucesso!");
    } else {
      res.status(500).send("Erro ao atualizar o registro de ocorrências.");
    }
  });
});

app.get('/ocorrencias', (req, res) => {
  res.sendFile(path.join(__dirname, 'ocorrencias.json'));
});

app.get("/I", (req, res) => {
  res.render("index2");
});

