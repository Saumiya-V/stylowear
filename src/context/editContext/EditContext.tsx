
import type { Item } from "@/types/type";
import { createContext, useContext, useState } from "react";

const EditContext = createContext<any>(null);

export const EditStateProvider = ({ children }: { children: React.ReactNode }) => {
 const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  return (
    <EditContext.Provider value={{ isEdit, setIsEdit, editItem, setEditItem }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => useContext(EditContext);

