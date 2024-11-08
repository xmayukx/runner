// components/global/Footer.js
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-neutral-900 text-neutral-400 py-14 px-4 md:px-10 lg:px-20 mt-[200px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1 md:gap-y-0">
            <h1 className="lg:text-2xl text-xl font-bold">Runner</h1>
            <p className="lg:text-sm text-xs">Automate your work with Runner</p>
          </div>
          <div>
            <Image
              src="/runner-logo.svg"
              alt="Runner Logo"
              width={100}
              height={100}
              className="invert lg:size-20 size-12"
            />
          </div>
        </div>
      </footer>

      {/* Footer credit section fixed at the extreme bottom */}
      <div className="text-center text-neutral-500 bg-neutral-900 py-4 lg:text-base text-sm">
        Designed and developed by
        <Link
          target="_blank"
          href={"https://www.mhazari.in/"}
          className=" hover:text-white ml-1"
        >
          Mayukh Hazari
        </Link>
      </div>
    </>
  );
}
