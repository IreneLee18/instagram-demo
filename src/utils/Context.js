import { userID, userPost } from "./API";
import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const ownerID = "6360036607df00c54b2ce688";
  const [owner, setOwner] = useState(null);
  const [ownerPostListID, setOwnerPostListID] = useState(null);
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
    userID(ownerID).then((res) => setOwner(res));
    userPost(ownerID).then((res) => {
      setOwnerPostListID( res.map((item) => item.id));
    });
    getInnerWidth();
  }, []);

  window.addEventListener("resize", () => {
    getInnerWidth();
  });

  if (owner === null || ownerPostListID === null)
    return null;
  return (
    <DataContext.Provider
      value={{
        ownerID,
        owner,
        ownerPostListID,
        setOwnerPostListID,
        currentPostID,
        setCurrentPostID,
        mediaSizePC,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
