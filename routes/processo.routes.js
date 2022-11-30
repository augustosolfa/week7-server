import express from "express";
import crypto from "crypto";

import ProcessoModel from "../model/processo.model.js";

const processoRoute = express.Router();

// Iteração 1

processoRoute.get("/all", async (req, res) =>
  res.status(200).json(await ProcessoModel.find({}))
);

processoRoute.post("/create", (req, res) => {
  if (!req.body) {
    return res.status(400).json("Não foram enviados dados.");
  }
  try {
    const processo = new ProcessoModel(req.body);
    return processo.save().then(() => res.status(201).json(processo._id));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

processoRoute.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ProcessoModel.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!response) {
      return res.status(404).json("Item não encontrado.");
    }
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

processoRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await ProcessoModel.findByIdAndDelete(id);
  if (!response) {
    return res.status(404).json("Item não encontrado.");
  }
  return res.status(200).json(id);
});

// Iteração 2

processoRoute.get("/process/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ProcessoModel.findById(id);
    if (!response) {
      return res.status(404).json("Item não encontrado.");
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

processoRoute.put("/addComment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ProcessoModel.findById(id);
    if (!("comment" in req.body)) {
      return res
        .status(400)
        .json('Comentário na forma {"comment": "comentário".');
    }
    if (!response) {
      return res.status(404).json("Item não encontrado.");
    }
    response.comments.push(req.body.comment);
    const document = await response.save();
    return res.status(200).json(document);
  } catch (error) {
    return res.status(400).json(error);
  }
});

processoRoute.get("/status/open", async (req, res) => {
  const open = await ProcessoModel.find({ status: { $eq: "Em andamento" } });
  return res.status(200).json(open);
});

processoRoute.get("/status/close", async (req, res) => {
  const close = await ProcessoModel.find({ status: { $eq: "Finalizado" } });
  return res.status(200).json(close);
});

// Bônus
processoRoute.get("/setor/:nomeSetor", async (req, res) => {
  const { nomeSetor } = req.params;
  // const processosSetor = bd.filter((processo) => processo.setor === nomeSetor);
  const processosSetor = await ProcessoModel.find({
    setor: { $eq: nomeSetor },
  });
  return res.status(200).json(processosSetor);
});

processoRoute.get("/random", async (req, res) => {
  const index = Math.floor(Math.random() * (await ProcessoModel.count()));
  const processo = await ProcessoModel.find({}).skip(index).limit(1);
  res.status(200).json(processo[0]);
});

export default processoRoute;
