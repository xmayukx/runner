import { create } from "zustand";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  fixed?: boolean;
  [key: string]: string | boolean | undefined;
}

type Store = {
  googleFile: any;
  setGoogleFile: (googleFile: any) => void;
  slackChannels: Option[];
  setSlackChannels: (slackChannels: Option[]) => void;
  selectedSlackChannel: Option[];
  setSelectedSlackChannel: (selectedSlackChannel: Option[]) => void;
};

export const useRunnerStore = create<Store>((set) => ({
  googleFile: null,
  setGoogleFile: (googleFile) => set({ googleFile }),
  slackChannels: [],
  setSlackChannels: (slackChannels) => set({ slackChannels }),
  selectedSlackChannel: [],
  setSelectedSlackChannel: (selectedSlackChannel) =>
    set({ selectedSlackChannel }),
}));
