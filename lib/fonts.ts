import { Bricolage_Grotesque, Poppins } from "next/font/google";
import localfont from "next/font/local";

export const clashDisplay = localfont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Variable.ttf",
      style: "vietnamese",
    },
  ],
  variable: "--font-clash-display",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const bric = Bricolage_Grotesque({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-bric",
});
