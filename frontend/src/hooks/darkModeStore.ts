import {create} from "zustand";

interface DarkModeStore {
    darkMode: boolean | string;
    toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeStore>((set) => ({
    darkMode: JSON.parse(<string>localStorage.getItem("darkMode")) || false,
    toggleDarkMode: () => set((state) => {
        const darkMode = !state.darkMode;
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        return {darkMode};
    }),
}));

export default useDarkModeStore;