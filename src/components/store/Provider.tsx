import React, { useEffect, useState } from "react";
import StoreContext from "./Context";
import useStorage from "../../utils/useStorage";
import jwtDecode from "jwt-decode";
import { StoreContextProps } from "./Context";

const initialUserState = {
  exp: 0,
  id: 0,
  sub: "",
};

type Props = {
  children: any;
  user: any;
};

type ContextProps = StoreContextProps & Props;

const StoreProvider = ({ children }: ContextProps) => {
  const [token, setToken, removeToken] = useStorage("token");
  const [apiKey, setApiKey, removeApiKey] = useStorage("apiKey");
  const [user, setUser] = useState(initialUserState);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);
    } else {
      setUser(initialUserState);
    }
  }, [token]);

  return (
    <StoreContext.Provider
      value={{
        token,
        setToken,
        removeToken,
        apiKey,
        setApiKey,
        removeApiKey,
        showFooter,
        setShowFooter,
        user,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
