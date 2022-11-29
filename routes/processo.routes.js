import express from "express";
import crypto from "crypto";

const processoRoute = express.Router();

const bd = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

// Iteração 1

processoRoute.get("/all", (req, res) => res.status(200).json(bd));

processoRoute.post("/create", (req, res) => {
  if (!req.body) {
    return res.status(400).json("Não foram enviados dados.");
  }
  const camposAusentes = [];
  for (let index in bd[0]) {
    if (!(index in req.body) && index !== "id") {
      camposAusentes.push(index);
    }
  }
  if (camposAusentes.length > 0) {
    return res.status(400).json({ camposAusentes: camposAusentes });
  }
  const processo = { id: crypto.randomUUID(), ...req.body };
  bd.push(processo);
  return res.status(201).json(processo.id);
});

processoRoute.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const processo = getById(id);
  if (!processo) {
    return res.status(404).json(`O id ${id} não consta na base de dados.`);
  }
  for (let index in req.body) {
    processo[index] = req.body[index];
  }
  return res.status(202).json(processo);
});

processoRoute.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const processo = getById(id);
  if (!processo) {
    return res.status(404).json(`O id ${id} não consta na base de dados.`);
  }
  const index = bd.indexOf(processo);
  bd.splice(index, 1);
  return res.status(202).json();
});

// Iteração 2

processoRoute.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const processo = getById(id);
  if (!processo) {
    return res.status(404).json(`O id ${id} não consta na base de dados.`);
  }
  return res.status(200).json(processo);
});

processoRoute.put("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const processo = getById(id);
  if (!processo) {
    return res.status(404).json(`O id ${id} não consta na base de dados.`);
  }
  const comentario = req.body["comment"];
  if (!comentario) {
    return res
      .status(400)
      .json(
        `Requisição sem comentários a acrescentar. Formato {"comment": "Texto do comentário"}`
      );
  }
  processo.comments.push(comentario);
  return res.status(202).json(processo);
});

processoRoute.get("/status/open", (req, res) => {
  const open = bd.filter((processo) => processo.status === "Em andamento");
  return res.status(200).json(open);
});

processoRoute.get("/status/close", (req, res) => {
  const close = bd.filter((processo) => processo.status === "Finalizado");
  return res.status(200).json(close);
});

// Bônus
processoRoute.get("/setor/:nomeSetor", (req, res) => {
  const { nomeSetor } = req.params;
  const processosSetor = bd.filter((processo) => processo.setor === nomeSetor);
  return res.status(200).json(processosSetor);
});

processoRoute.get("/random", (req, res) =>
  res.status(200).json(bd[Math.floor(Math.random() * bd.length)])
);

function getById(id) {
  return bd.find((process) => process.id === id);
}

export default processoRoute;
