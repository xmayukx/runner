import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { Navbar } from "@/components/global/navbar";
import PricingCards from "@/components/pricingCards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clients } from "@/lib/constants";
import Image from "next/image";

export type Feature = {
  name: string;
  disabled: boolean;
};

// Define the PricingPlan type
export type PricingPlan = {
  title: string;
  price: string;
  features: Feature[];
};

export const pricing: PricingPlan[] = [
  {
    title: "Basic",
    price: "$9.99",
    features: [
      {
        name: "Unlimited Projects",
        disabled: false,
      },
      {
        name: "Unlimited Storage",
        disabled: false,
      },
      {
        name: "Priority Support",
        disabled: true,
      },
      {
        name: "Unlimited Users",
        disabled: false,
      },
    ],
  },
  {
    title: "Pro",
    price: "$19.99",
    features: [
      {
        name: "Unlimited Projects",
        disabled: false,
      },
      {
        name: "Unlimited Storage",
        disabled: false,
      },
      {
        name: "Priority Support",
        disabled: false,
      },
      {
        name: "Unlimited Users",
        disabled: false,
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className=" absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className=" flex flex-col md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 border-r-2 border-solid rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-lg hover:shadow-neutral-600 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                    Start For Free Today
                  </span>
                </Button>
                <h1 className="text-5xl md:text-8xl tracking-tight  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Automate Your Work With Runner
                </h1>
              </div>
            }
          >
            <Image
              src={`/temp-banner.png`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </section>
      <section className=" mt-[500px]">
        <div className="flex flex-col gap-y-10 justify-center ">
          {/* Title  */}
          <h1 className="lg:text-7xl md:text-6xl text-5xl font-semibold flex flex-col font-sans text-center">
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 relative lg:right-5 md:right-3 font-bold tracking-tight ">
              <span className=" ">Select</span> a subscription
            </span>
            <span className=" relative lg:left-24 md:left-15 bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 font-extrabold tracking-tight">
              that works <span className="">for you</span>{" "}
            </span>
          </h1>

          {/* Cards */}
          <div className="lg:flex lg:space-x-5 lg:mx-[15%] md:mx-[20%] mx-[15%] gap-y-2">
            {pricing.map((price, key) => (
              <PricingCards
                key={key}
                title={price.title}
                price={price.price}
                features={price.features}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
