import { Navbar } from "@/components/global/navbar";
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
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { pricing } from "@/lib/constants";
import PricingCards from "@/components/pricingCards";
import NotificationBar from "@/components/notification-bar";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <main className="">
      <NotificationBar />
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md  relative flex flex-col items-center antialiased">
        <div className="flex items-center flex-col text-center relative top-[30%] gap-y-5">
          <div className=" flex items-center justify-center">
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
      </section>

      <section className=" mb-[200px] -top-[100px] relative">
        <Card className=" p-2 md:p-4 lg:p-4  lg:w-[80%] w-[85%]  mx-auto bg-neutral-900 rounded-2xl">
          <video
            src="https://github.com/user-attachments/assets/9e393409-34eb-41c6-9404-c6d4e368c8aa"
            autoPlay
            loop={true}
            muted
            playsInline
            className=" rounded-lg"
          ></video>
        </Card>
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
              that works <span className=" ml-3"> for you</span>{" "}
            </span>
          </h1>

          {/* Cards */}
          <div className="lg:flex lg:space-x-5 lg:space-y-0 lg:mx-[15%] md:mx-[20%] mx-[15%] space-y-3">
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
      <Footer />
    </main>
  );
}
