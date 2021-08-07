import React, { createContext, useContext, useState } from 'react';

const FaveContext = createContext();

const ListFaveContext = ({ children }) => {
  const [fave, setFave] = useState();

  return <FaveContext.Provider value={{ fave, setFave }}>{children}</FaveContext.Provider>;
};
export function useListContext() {
  return useContext(FaveContext);
}
export default ListFaveContext;
