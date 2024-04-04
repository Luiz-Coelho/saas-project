type PricingItem = {
  title: string;
  description: string;
  frequency: Frequency[];
};

type Frequency =
  | { text: "Diária"; css: "daily" }
  | { text: "Semanal"; css: "weekly" }
  | { text: "Mensal"; css: "monthly" }
  | { text: "Eventual"; css: "eventually" };

export default PricingItem;
