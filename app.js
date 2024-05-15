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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

// Rota POST para registrar novas ocorrências
app.post("/ocoLinhas", (req, res) => {
  const newOcorrencia = {
    data: req.body.data,
    horario: req.body.horario,
    linha: req.body.linha,
    estacao: req.body.estacao,
    bloco: req.body.bloco,
    inviabilizou_o_bloco:
      req.body.Inviabilizou_o_bloco === "Inviabilizou_o_bloco",
    impacto_na_velocidade:
      req.body.Impacto_na_velocidade === "Impacto na velocidade",
    descricao: req.body.descricao,
  };

  const filePath = path.join(__dirname, "ocorrencias.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      // Se ocorrer um erro na leitura, considere que o arquivo pode estar ausente e crie um novo
      fs.writeFile(
        filePath,
        JSON.stringify({ ocorrencias: [newOcorrencia] }, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Falha ao criar o arquivo:", writeErr);
            res.status(500).send("Erro ao registrar a ocorrência.");
          } else {
            res.send("Ocorrência de trem registrada com sucesso!");
          }
        }
      );
    } else {
      // Se o arquivo existir, parseie os dados, adicione a nova ocorrência e salve novamente
      let ocorrencias = JSON.parse(data).ocorrencias;
      ocorrencias.push(newOcorrencia);
      fs.writeFile(
        filePath,
        JSON.stringify({ ocorrencias: ocorrencias }, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Falha ao salvar o arquivo atualizado:", writeErr);
            res
              .status(500)
              .send("Erro ao atualizar o registro de ocorrências.");
          } else {
            res.sendFile("sucessMessage.html", {
              root: path.join(__dirname, "views"),
            });
          }
        }
      );
    }
  });
});



// Rota GET para exibir histórico de ocorrências
// Rota GET para exibir histórico de ocorrências
app.get("/historico", (req, res) => {
  const filePath = path.join(__dirname, "ocorrencias.json");
  console.log("FilePath:", filePath); // Confirma o caminho do arquivo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo de ocorrências:", err);
      res.render("historico", { ocorrencias: [] });
    } else {
      console.log("Dados lidos do arquivo:", data);
      try {
        const ocorrencias = JSON.parse(data);
        console.log("Ocorrências:", ocorrencias); // Confirma dados lidos
        res.render("historico", { ocorrencias: ocorrencias });
      } catch (parseError) {
        console.error("Erro ao analisar os dados do JSON:", parseError);
        res.render("historico", { ocorrencias: [] });
      }
    }
  });
});

app.post("/ocoTrens", (req, res) => {
  const novaOcorrenciaTrem = {
    data: req.body.data,
    horario: req.body.horario,
    numero_do_trem: req.body.numero_do_trem,
    linha: req.body.linha,
    categoria: req.body.categoria,
    descricao: req.body.descricao,
    impacto_na_operacao: req.body.impacto_na_operacao === "on",
  };

  //ver como aparecer no console
  //console.log("Nova ocorrência de Trem:", novaOcorrenciaTrem)

  const filePath = path.join(__dirname, "ocorrenciasTrens.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // Se ocorrer um erro na leitura, considere que o arquivo pode estar ausente e crie um novo
      fs.writeFile(
        filePath,
        JSON.stringify({ ocorrenciasTrens: [novaOcorrenciaTrem] }, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Falha ao criar o arquivo:", writeErr);
            res.status(500).send("Erro ao registrar a ocorrência de trem.");
          } else {
            res.send("Ocorrência de trem registrada com sucesso!");
          }
        }
      );
    } else {
      // Se o arquivo existir, parseie os dados, adicione a nova ocorrência e salve novamente
      let ocorrenciasTrens = JSON.parse(data).ocorrenciasTrens;
      ocorrenciasTrens.push(novaOcorrenciaTrem);
      fs.writeFile(
        filePath,
        JSON.stringify({ ocorrenciasTrens: ocorrenciasTrens }, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Falha ao salvar o arquivo atualizado:", writeErr);
            res
              .status(500)
              .send("Erro ao atualizar o registro de ocorrências de trens.");
          } else {
            res.sendFile("sucessMessage.html", {
              root: path.join(__dirname, "views"),
            });
          }
        }
      );
    }
  });
});
