import React, { useContext, useState } from "react";

const LoadDataContext = React.createContext(null);
export const useLoadContext = () => useContext(LoadDataContext);
const DataLoadContext = ({ children }) => {
  const [load, setLoad] = useState(false);
  return (
    <LoadDataContext.Provider value={{ load, setLoad: setLoad }}>
      {children}
    </LoadDataContext.Provider>
  );
};

export default DataLoadContext;
