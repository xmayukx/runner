"use client";
import React from "react";

type Props = {
  credits: string;
  tier: string;
  setCredits: React.Dispatch<React.SetStateAction<string>>;
  setTier: React.Dispatch<React.SetStateAction<string>>;
};

const initialValues: Props = {
  credits: "",
  tier: "",
  setCredits: () => {},
  setTier: () => {},
};

type WithChildProps = {
  children: React.ReactNode;
};

const context = React.createContext<Props>(initialValues);

const { Provider } = context;

export const BillingProvider = ({ children }: WithChildProps) => {
  const [credits, setCredits] = React.useState<string>("");
  const [tier, setTier] = React.useState<string>("");

  return (
    <Provider value={{ credits, tier, setCredits, setTier }}>
      {children}
    </Provider>
  );
};

export const useBilling = () => {
  const state = React.useContext(context);
  return state;
};
