import PricingCard from "./PricingCard";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoriesService";

export default function CarouselDiv() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="grid grid-cols-pricingGrid gap-4 w-4/5 justify-center mx-auto">
      {data?.map((category) => (
        <PricingCard
          key={category._id}
          label={category.name}
          description={category.name}
        />
      ))}
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
    </div>
  );
}
