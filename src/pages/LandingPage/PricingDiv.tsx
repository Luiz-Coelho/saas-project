import PricingCard from "./PricingCard";
import { items } from "@/data";

const ITEMS = items;

export default function CarouselDiv() {
  return (
    <div className="grid grid-cols-pricingGrid gap-4 w-4/5 justify-center mx-auto">
      {ITEMS.map((item) => (
        <PricingCard key={item.title} item={item} />
      ))}
    </div>
  );
}
