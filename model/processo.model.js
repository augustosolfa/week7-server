import { Schema, model } from "mongoose";

// {
//   id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
//   documentName: "Licitação Compras - Ar Condicionado",
//   status: "Finalizado",
//   details: "Processo de licitação para compra de ar-condicionado",
//   dateInit: "15/11/2022",
//   comments: ["Processo em aberto", "Processo finalizado"],
//   dateEnd: "25/11/2022",
//   setor: "trj",
// }

const processoSchema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    status: {
      type: String,
      required: true,
      enum: ["Em andamento", "Finalizado"],
      default: "Em andamento",
    },
    details: {
      type: String,
      trim: true
    },
    dateInit: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
    },
    comments: [
      {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 100,
      },
    ],
    setor: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);


const ProcessoModel = model("Processo", processoSchema);

export default ProcessoModel;