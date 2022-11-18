import {
  userPostID,
  userPostComment,
  updateUsePostID,
} from "../utils/API";
import { DataContext } from "../utils/Context";
import { useContext, useState, useCallback } from "react";
function usePost(currentPostID) {
  const {  user } = useContext(DataContext);

  const [postUser, setPostUser] = useState(null);
  const [postMsgList, setPostMsgList] = useState(null);

  const getPostComment = useCallback(() => {
    if (currentPostID === "") return;
    userPostID(currentPostID).then((res) => {
      res.userLike = false;
      setPostUser(res);
    });
    userPostComment(currentPostID).then((res) => {
      res.data.map((item) => (item.like = false));
      setPostMsgList(res.data.reverse());
    });
  }, [currentPostID]);
  const initPostComment = useCallback(() => {
    setPostUser(null);
    setPostMsgList(null);
  }, []);

  const handleClickSwitchLike = () => {
    if (postUser.userLike) {
      userPostID(currentPostID)
        .then((res) => {
          const list = { ...res };
          list.likes--;
          return list;
        })
        .then((res) => {
          updateUsePostID(currentPostID, res).then(() => {
            const postData = { ...postUser };
            postData.likes--;
            postData.userLike = false;
            setPostUser(postData);
          });
        });
    } else {
      userPostID(currentPostID)
        .then((res) => {
          const list = { ...res };
          list.likes++;
          return list;
        })
        .then((res) => {
          updateUsePostID(currentPostID, res).then(() => {
            const postData = { ...postUser };
            postData.likes++;
            postData.userLike = true;
            setPostUser(postData);
          });
        });
    }
  };

  return {
    user,
    postUser,
    postMsgList,
    setPostMsgList,
    handleClickSwitchLike,
    getPostComment,
    initPostComment,
  };
}

export default usePost;
