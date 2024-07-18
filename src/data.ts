import { Category } from "./typing/Category";

export const categories: Category[] = [
  {
    id: "1c",
    title: "Extraordinário",
    description: "Comum",
    frequency: [
      { text: "Diária", css: "daily" },
      { text: "Semanal", css: "weekly" },
      { text: "Mensal", css: "monthly" },
      { text: "Eventual", css: "eventually" },
    ],
  },
  {
    id: "2c",
    title: "Biológico",
    description: "Infectante",
    frequency: [
      { text: "Semanal", css: "weekly" },
      { text: "Mensal", css: "monthly" },
      { text: "Eventual", css: "eventually" },
    ],
  },
  {
    id: "3c",
    title: "Químico",
    description: "Perigosos",
    frequency: [
      { text: "Semanal", css: "weekly" },
      { text: "Mensal", css: "monthly" },
      { text: "Eventual", css: "eventually" },
    ],
  },
  {
    id: "4c",
    title: "Reciclável",
    description: "Reciclável",
    frequency: [
      { text: "Semanal", css: "weekly" },
      { text: "Mensal", css: "monthly" },
      { text: "Eventual", css: "eventually" },
    ],
  },
];

export const routeNames: { path: string; label: string }[] = [
  {
    path: "app",
    label: "Aplicativo",
  },
  {
    path: "administrative",
    label: "Administrativo",
  },
  {
    path: "users",
    label: "Usuários",
  },
  {
    path: "newuser",
    label: "Novo Usuário",
  },
  {
    path: "departments",
    label: "Setores",
  },
  {
    path: "financial",
    label: "Financeiro",
  },
  {
    path: "payables",
    label: "Contas a pagar",
  },
  {
    path: "receivables",
    label: "Contas a receber",
  },
  {
    path: "operational",
    label: "Operacional",
  },
  {
    path: "customers",
    label: "Clientes",
  },
  {
    path: "newcustomer",
    label: "Novo Usuário",
  },
  {
    path: "orders",
    label: "Ordem de Serviço",
  },
  {
    path: "tracks",
    label: "Rotas",
  },
  {
    path: "automobiles",
    label: "Automóveis",
  },
];

export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Extraordinário",
    href: "#",
    description:
      "Este tipo de coleta é geralmente destinado a resíduos que não se enquadram nas categorias regulares de coleta. Pode incluir itens de grande volume ou resíduos gerados por eventos especiais que requerem atenção especial para o descarte.",
  },
  {
    title: "Biológico",
    href: "#",
    description:
      "Refere-se à coleta de resíduos que têm origem biológica, como restos de alimentos, folhas, caules, sementes, papéis usados, dejetos humanos, entre outros.",
  },
  {
    title: "Químico",
    href: "#",
    description:
      "Esses resíduos precisam de um tratamento especial para evitar a contaminação do meio ambiente e riscos à saúde pública. Normalmente, são incluídos na categoria de resíduos perigosos e podem ser identificados pela cor laranja em sistemas de coleta seletiva",
  },
];

export const tracks: { id: string; name: string }[] = [
  {
    id: "1f",
    name: "A",
  },
  {
    id: "2f",
    name: "B",
  },
  {
    id: "3f",
    name: "C",
  },
  {
    id: "4f",
    name: "D",
  },
  {
    id: "5f",
    name: "Zona Sul",
  },
  {
    id: "6f",
    name: "Zona Norte",
  },
  {
    id: "7f",
    name: "Barra",
  },
  {
    id: "8f",
    name: "Freguesia",
  },
];

export const status: { name: string; title: string }[] = [
  {
    name: "active",
    title: "Ativo",
  },
  {
    name: "inactive",
    title: "Inativo",
  },
];
