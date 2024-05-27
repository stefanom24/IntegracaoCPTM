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

app.post("/historico", (req, resp) => {
  let;
});

app.post("/historico", (req, resp) => {
  let;
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

app.listen(9000, () => {
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
//LINHAS
app.get('/ocorrencias', (req, res) => {
  res.sendFile(path.join(__dirname, 'ocorrencias.json')); // Certifique-se que o caminho está correto
});

app.post('/ocoLinhas', (req, res) => {
  const newOcorrencia = {
      data: req.body.data,
      horario: req.body.horario,
      linha: req.body.linha,
      estacao: req.body.estacao,
      bloco: req.body.bloco,
      inviabilizou_o_bloco: req.body.Inviabilizou_o_bloco == 'on',
      impacto_na_velocidade: req.body.Impacto_na_velocidade == 'on',
      descricao: req.body.descricao
  };

  console.log('Nova ocorrência recebida:', newOcorrencia);

  const filePath = path.join(__dirname, 'ocorrencias.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      let ocorrencias = [];

      if (!err && data) {
          try {
              // Tente parsear os dados. Se houver erro, o bloco catch tratará.
              ocorrencias = JSON.parse(data).ocorrencias || [];
          } catch (parseError) {
              console.error("Erro ao analisar os dados do JSON:", parseError);
              // Se houver erro no parse, consideramos 'ocorrenciasEstacoes' ainda como array vazio.
          }
      }

      ocorrencias.push(newOcorrencia);

      fs.writeFile(filePath, JSON.stringify({ ocorrencias: ocorrencias }, null, 2), writeErr => {
          if (writeErr) {
              console.error("Falha ao salvar o arquivo atualizado:", writeErr);
              res.status(500).send("Erro ao atualizar o registro de ocorrências.");
          } else {
              res.send("Ocorrência de estação registrada com sucesso!");
          }
      });
  });
});

//TRENS
app.post('/ocoTrens', (req, res) => {
  const newOcorrencia = {
      data: req.body.data,
      horario: req.body.horario,
      codigo_trem: req.body.codigo_trem,
      linha: req.body.linha,
      bloco: req.body.bloco,
      inviabilizou_o_bloco: req.body.Inviabilizou_o_bloco === 'on',
      impacto_na_velocidade: req.body.Impacto_na_velocidade === 'on',
      categoria: req.body.Categoria,
      descricao: req.body.descricao
  };

  console.log('Nova ocorrência recebida:', newOcorrencia);

  const filePath = path.join(__dirname, 'ocorrenciasTrens.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      let ocorrenciasTrens = [];

      if (!err && data) {
          try {
              // Tente parsear os dados. Se houver erro, o bloco catch tratará.
              ocorrenciasTrens = JSON.parse(data).ocorrenciasTrens || [];
          } catch (parseError) {
              console.error("Erro ao analisar os dados do JSON:", parseError);
              // Se houver erro no parse, consideramos 'ocorrenciasEstacoes' ainda como array vazio.
          }
      }

      ocorrenciasTrens.push(newOcorrencia);

      fs.writeFile(filePath, JSON.stringify({ ocorrenciasTrens: ocorrenciasTrens }, null, 2), writeErr => {
          if (writeErr) {
              console.error("Falha ao salvar o arquivo atualizado:", writeErr);
              res.status(500).send("Erro ao atualizar o registro de ocorrências.");
          } else {
              res.send("Ocorrência de estação registrada com sucesso!");
          }
      });
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
      categoria: req.body.Categoria,
      descricao: req.body.descricao
  };

  console.log('Nova ocorrência recebida:', newOcorrencia);

  const filePath = path.join(__dirname, 'ocorrenciasEstacoes.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      let ocorrenciasEstacoes = [];

      if (!err && data) {
          try {
              // Tente parsear os dados. Se houver erro, o bloco catch tratará.
              ocorrenciasEstacoes = JSON.parse(data).ocorrenciasEstacoes || [];
          } catch (parseError) {
              console.error("Erro ao analisar os dados do JSON:", parseError);
              // Se houver erro no parse, consideramos 'ocorrenciasEstacoes' ainda como array vazio.
          }
      }

      ocorrenciasEstacoes.push(newOcorrencia);

      fs.writeFile(filePath, JSON.stringify({ ocorrenciasEstacoes: ocorrenciasEstacoes }, null, 2), writeErr => {
          if (writeErr) {
              console.error("Falha ao salvar o arquivo atualizado:", writeErr);
              res.status(500).send("Erro ao atualizar o registro de ocorrências.");
          } else {
              res.send("Ocorrência de estação registrada com sucesso!");
          }
      });
  });
});


//ainda não está pronto
// Rota GET para exibir histórico de ocorrências
app.get('/historico', (req, res) => {
    const filePaths = {
        ocorrenciasTrens: path.join(__dirname, 'ocorrenciasTrens.json'),
        ocorrenciasLinhas: path.join(__dirname, 'ocorrenciasLinhas.json'),
        ocorrenciasEstacoes: path.join(__dirname, 'ocorrenciasEstacoes.json')
    };

    // Lê e combina as ocorrências de todos os arquivos
    Promise.all(Object.entries(filePaths).map(([key, filePath]) =>
        fs.promises.readFile(filePath, 'utf8').then(data => JSON.parse(data)[key] || []).catch(err => {
            console.error(`Erro ao ler o arquivo de ${key}:`, err);
            return [];  // Retorna um array vazio em caso de erro
        })
    )).then(results => {
        // Combina todos os arrays de ocorrências em um único array
        const ocorrencias = results.flat();
        res.render('historico', { ocorrencias });
    }).catch(error => {
        console.error("Erro ao processar os arquivos de ocorrências:", error);
        res.render('historico', { ocorrencias: [] });
    });
});

app.get("/I", (req, res) => {
  res.render("index2");
});

