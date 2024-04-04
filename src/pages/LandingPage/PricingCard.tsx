import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import PricingItem from "@/typing/PricingItem";

type PricingCardProps = {
  item: PricingItem;
};

export default function PricingCard({
  item: { title, description, frequency },
}: PricingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2>Frequências de coletas disponíveis:</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {frequency.map((freq) => (
            <Badge variant={freq.css}>{freq.text}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex mt-6">
        <Button className="w-full">Saiba Mais</Button>
      </CardFooter>
    </Card>
  );
}
