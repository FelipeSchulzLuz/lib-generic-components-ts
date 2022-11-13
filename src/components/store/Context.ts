import { createContext } from "react";

export interface StoreContextProps {
  apiKey: string | null;
  token: string | null;
  setToken: (token: string) => void;
  setApiKey: (apiKey: string) => void;
  removeApiKey: () => void;
  removeToken: () => void;
  user: User | null;
  setShowFooter: (show: boolean) => void;
  showFooter: boolean;
}

interface User {
  exp: number;
  id: number;
  sub: string;
}

export const storeDefaultValues: StoreContextProps = {
  token: null,
  apiKey: null,
  setToken: () => {},
  setApiKey: () => {},
  removeApiKey: () => {},
  removeToken: () => {},
  user: {
    exp: 0,
    id: 0,
    sub: "",
  },
  setShowFooter: (show: boolean) => {},
  showFooter: false,
};

const StoreContext = createContext(storeDefaultValues);
export default StoreContext;
