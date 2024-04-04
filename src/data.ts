import PricingItem from "./typing/PricingItem";

export const items: PricingItem[] = [
  {
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
    title: "Biológico",
    description: "Infectante",
    frequency: [
      { text: "Semanal", css: "weekly" },
      { text: "Mensal", css: "monthly" },
      { text: "Eventual", css: "eventually" },
    ],
  },
  {
    title: "Químico",
    description: "Perigosos",
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

export const categories: { value: string; label: string }[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const tracks: string[] = ["A", "B", "C"];

export const status: string[] = ["active", "inactive"];
