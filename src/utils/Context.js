import { createContext, useEffect, useState } from "react";
import { userID, userPost } from "./API";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const ownerID = "6360036607df00c54b2ce688";
  const [user, setUser] = useState(null);
  const [userPostList, setUserPostList] = useState(null);
  const [userPostListID, setUserPostListID] = useState(null);
  useEffect(() => {
    userID(ownerID).then((res) => setUser(res));
    userPost(ownerID).then((res) => {
      setUserPostList(res.data);
      const list = [];
      res.data.forEach((item) => list.push(item.id));
      setUserPostListID(list);
    });
  }, []);
  return (
    <DataContext.Provider
      value={{
        ownerID,
        user,
        userPostList,
        setUserPostList,
        userPostListID,
        setUserPostListID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
