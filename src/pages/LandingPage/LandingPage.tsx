import { useEffect } from "react";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "../../components/ui/use-toast";

import { FaWhatsapp } from "react-icons/fa";

import PricingDiv from "./PricingDiv";
import LandingPageHeader from "./LandingPageHeader";
import LandingPageFooter from "./LandingPageFooter";

export default function LandingPage() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Entre em contato conosco.",
      description: "Nos envie uma mensagem pelo WhatsApp.",
      action: (
        <ToastAction altText="Whats App">
          <FaWhatsapp className="h-6 w-6 text-wpp" />
        </ToastAction>
      ),
    });
  }, []);

  return (
    <>
      <LandingPageHeader />
      <main>
        <section className="flex flex-col gap-y-4 pt-20">
          <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Precisando de coleta para o seu endereço?
          </h2>
          <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
            Nós temos os preços mais em conta com contratos da forma mais
            descomplicada e agéis do mercado.
          </p>
          <h2 className="text-center scroll-m-20 mt-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Planos
          </h2>
          <PricingDiv />
        </section>
      </main>
      <Separator className="my-20" />
      <LandingPageFooter />
    </>
  );
}
