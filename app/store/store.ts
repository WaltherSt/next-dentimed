import { create } from "zustand";

type User = {
  id: string;
  nombres: string;
  apellidos: string;
  correo: string;
};

type Action={
    
}



const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: any) => set({ bears: newBears }),
}));
