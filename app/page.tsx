import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { Navbar } from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/constants";
import Image from "next/image";

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
        {/* <div className=" flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72"></div>  */}
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl font-bold mb-6">
            Select a subscription <br /> that works for you
          </h1>
          <div className="flex space-x-6">
            <div className="bg-lime-200 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Standard</h2>
              <p className="text-4xl font-bold mb-4">$955/m</p>
              <ul className="mb-6">
                <li className="mb-2">- 1 Request at a time</li>
                <li className="mb-2">- Average 48h turnaround</li>
                <li className="mb-2">- Pause or cancel anytime</li>
                <li className="line-through mb-2">- Priority support</li>
                <li className="line-through mb-2">- Goodnight wishes</li>
                <li className="mb-2">+ Webflow development</li>
              </ul>
              <button className="bg-black text-white py-2 px-4 rounded">
                Purchase
              </button>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Plus</h2>
              <p className="text-4xl font-bold mb-4">$1500/m</p>
              <ul className="mb-6">
                <li className="mb-2">- 2 Requests at a time</li>
                <li className="mb-2">- Average 24h - 48h turnaround</li>
                <li className="mb-2">- Pause or cancel anytime</li>
                <li className="mb-2">- Priority support</li>
                <li className="mb-2">- Goodnight wishes</li>
                <li className="mb-2">+ Webflow development</li>
              </ul>
              <button className="bg-black text-white py-2 px-4 rounded">
                Purchase
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
