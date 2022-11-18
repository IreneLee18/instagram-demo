import { createContext, useEffect, useState } from "react";
import { userID, userPost } from "./API";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const ownerID = "6360036607df00c54b2ce688";
  const [user, setUser] = useState(null);
  const [userPostList, setUserPostList] = useState(null);
  const [userPostListID, setUserPostListID] = useState(null);
  const [currentPostID, setCurrentPostID] = useState("");
  const [mediaSizePC, setMediaSizePC] = useState(true);

  const getInnerWidth = () => {
    const width = window.innerWidth;
    if (width > 820) {
      setMediaSizePC(true);
    } else {
      setMediaSizePC(false);
    }
  };

  useEffect(() => {
    userID(ownerID).then((res) => setUser(res));
    userPost(ownerID).then((res) => {
      setUserPostList(res.data);
      const idList = res.data.map((item) => item.id);
      setUserPostListID(idList);
    });
    getInnerWidth();
  }, []);

  window.addEventListener("resize", () => {
    getInnerWidth();
  });

  if (user === null || userPostList === null || userPostListID === null)
    return null;
  return (
    <DataContext.Provider
      value={{
        ownerID,
        user,
        userPostList,
        setUserPostList,
        userPostListID,
        setUserPostListID,
        currentPostID,
        setCurrentPostID,
        mediaSizePC
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
