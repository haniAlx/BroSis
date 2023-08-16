import React, { createContext, useContext, useEffect, useState } from "react";

const ContextUser = createContext(null);
export function useUserContext() {
  return useContext(ContextUser);
}

function UserContext({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <ContextUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </ContextUser.Provider>
  );
}

export default UserContext;
