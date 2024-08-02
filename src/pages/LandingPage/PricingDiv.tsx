import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { Category } from "@/typing/Category";
import axios from "axios";

export default function CarouselDiv() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="grid grid-cols-pricingGrid gap-4 w-4/5 justify-center mx-auto">
      {categories.map((category) => (
        <PricingCard
          key={category.id}
          label={category.name}
          description={category.name}
        />
      ))}
    </div>
  );
}
