import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";

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

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get("/all", (req, res) => res.status(200).json(bd));

app.post("/create", (req, res) => {
  const processo = { id: crypto.randomUUID(), ...req.body };
  bd.push(processo);
  return res.status(201).json(processo.id);
});

app.put("/edit/:id", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const processo = getById(id);
  if (!processo) {
    return res.status(404).json(`O id ${id} não consta na base de dados.`);
  }
  const index = bd.indexOf(processo);
  bd.splice(index, 1);
  return res.status(202).json();
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});

function getById(id) {
  return bd.find((process) => process.id === id);
}
