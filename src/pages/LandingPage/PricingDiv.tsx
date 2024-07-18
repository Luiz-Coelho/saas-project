import PricingCard from "./PricingCard";
import { categories } from "@/data";

export default function CarouselDiv() {
  return (
    <div className="grid grid-cols-pricingGrid gap-4 w-4/5 justify-center mx-auto">
      {categories.map((category) => (
        <PricingCard key={category.id} item={category} />
      ))}
    </div>
  );
}
