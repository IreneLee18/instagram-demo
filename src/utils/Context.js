import { createContext, useEffect, useState } from "react";
import { userID, userPost } from "./API";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPostList, setUserPostList] = useState(null);
  useEffect(() => {
    userID("6360036607df00c54b2ce688").then((res) => setUser(res));
    userPost("6360036607df00c54b2ce688").then((res) =>
      setUserPostList(res.data)
    );
  }, []);
  return (
    <DataContext.Provider
      value={{
        user,
        userPostList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
