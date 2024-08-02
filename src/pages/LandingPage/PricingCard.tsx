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
import { frequencies } from "@/data";

type PricingCardProps = {
  label: string;
  description: string;
};

export default function PricingCard({ label, description }: PricingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2>Frequências de coletas disponíveis:</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {frequencies.map((frequency) => (
            <Badge key={frequency.text} variant={frequency.css}>
              {frequency.text}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex mt-6">
        <Button className="w-full">Saiba Mais</Button>
      </CardFooter>
    </Card>
  );
}
