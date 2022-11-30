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
      trim: true,
    },
    dateInit: {
      type: Date,
      required: true,
      set: (d) => {
        const [day, month, year] = d.split("/");
        return new Date(+year, month - 1, +day);
      },
      get: (d) => {
        if (!d) {
          return null;
        }
        function pad(number) {
          return number < 10 ? "0" + number : number;
        }
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          "/"
        );
      },
    },
    dateEnd: {
      type: Date,
      set: (d) => {
        const [day, month, year] = d.split("/");
        return new Date(+year, month - 1, +day);
      },
      get: (d) => {
        if (!d) {
          return null;
        }
        function pad(number) {
          return number < 10 ? "0" + number : number;
        }
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          "/"
        );
      },
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
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const ProcessoModel = new model("Processo", processoSchema);

export default ProcessoModel;
