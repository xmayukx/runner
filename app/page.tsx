import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { Navbar } from "@/components/global/navbar";
import PricingCards from "@/components/pricingCards";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clients, pricing } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import PricingSeciton from "./_components/pricing-section";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="flex items-center flex-col text-center relative top-[30%] gap-y-5">
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span> Introducing Runner</span>
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className=" text-5xl md:text-7xl md:mx-[20%] mx-[10%] font-clashDisplay bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-semibold tracking-tight">
            Automate Your Work With Runner
          </h1>
        </div>

        {/* <div className=" absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className=" flex flex-col md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <div className="z-10 flex mb-10 items-center justify-center">
                  <div
                    className={cn(
                      "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                    )}
                  >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                      <span> Introducing Runner</span>
                    </AnimatedShinyText>
                  </div>
                </div>
                <h1 className=" text-5xl md:text-8xl font-clashDisplay bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-bold tracking-tight">
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
        </div> */}
      </section>

      <section className="">
        <div className="flex flex-col gap-y-10 justify-center ">
          {/* Title  */}
          <h1 className="lg:text-7xl md:text-6xl text-5xl flex flex-col text-center font-semibold tracking-tighter font-clashDisplay">
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 relative lg:right-5 md:right-3 tracking-tight ">
              <span className=" ">Select</span> a{" "}
              <div className="relative inline-block">
                <span className="absolute inset-0 bg-stone-200 transform -rotate-1 -z-10"></span>
                <span className="relative text-stone-700">subscription</span>
              </div>
            </span>
            <span className="flex justify-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 tracking-tight">
              that works <span className=""> for you</span>{" "}
            </span>
          </h1>

          {/* Cards */}
          <div className="lg:flex lg:space-x-5 lg:mx-[15%] md:mx-[20%] mx-[15%] gap-y-2">
            <PricingSeciton />
          </div>
        </div>
      </section>
    </main>
  );
}
