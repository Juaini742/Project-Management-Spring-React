import {create} from "zustand";

interface DarkModeStore {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeStore>((set) => ({
    darkMode: false,
    toggleDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
}));

export default useDarkModeStore;