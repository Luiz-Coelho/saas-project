import { Frequency } from "./types/Frequency";

export const frequencies: Frequency[] = [
  {
    text: "Diária",
    css: "daily",
  },
  {
    text: "Semanal",
    css: "weekly",
  },
  {
    text: "Mensal",
    css: "monthly",
  },
  {
    text: "Eventual",
    css: "eventually",
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
    path: "categories",
    label: "Finalidades",
  },
  {
    path: "newcategory",
    label: "Nova Finalidade",
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
    path: "newtrack",
    label: "Nova Rota",
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
