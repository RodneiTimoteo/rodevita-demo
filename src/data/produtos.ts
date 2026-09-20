export type Produto = {
  id: number;
  nome: string;
  dosagem: string;
  categoria: string;
  exigeReceita: boolean;
};

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Dipirona",
    dosagem: "500 mg",
    categoria: "Analgésicos",
    exigeReceita: false,
  },
  {
    id: 2,
    nome: "Paracetamol",
    dosagem: "750 mg",
    categoria: "Analgésicos",
    exigeReceita: false,
  },
  {
    id: 3,
    nome: "Amoxicilina",
    dosagem: "500 mg",
    categoria: "Antibióticos",
    exigeReceita: true,
  },
  {
    id: 4,
    nome: "Losartana",
    dosagem: "50 mg",
    categoria: "Pressão arterial",
    exigeReceita: true,
  },
  {
    id: 5,
    nome: "Loratadina",
    dosagem: "10 mg",
    categoria: "Antialérgicos",
    exigeReceita: false,
  },
  {
    id: 6,
    nome: "Vitamina C",
    dosagem: "1 g",
    categoria: "Vitaminas",
    exigeReceita: false,
  },
];
