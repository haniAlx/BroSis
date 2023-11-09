import React, { createContext, useContext, useEffect, useState } from "react";

const ContextUser = createContext(null);
export function useUserContext() {
  return useContext(ContextUser);
}

function UserContext({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [jwt,setJwt]=useState("")
  useEffect(() => {
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("jwt") ))
    {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    setJwt(JSON.parse(localStorage.getItem("jwt")))
  }
  }, []);
  return (
    <ContextUser.Provider value={{ currentUser, setCurrentUser ,jwt }}>
      {children}
    </ContextUser.Provider>
  );
}

export default UserContext;
