import { userID, userPost } from "../../utils/API";
import { DataContext } from "../../utils/Context";
import { useParams } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import Page from "./Page/Page";
import Post from "../../components/Modal/Post/Post";
function UserPage() {
  const { ID } = useParams();
  const { user, userPostList } = useContext(DataContext);
  const [otherUser, setOtherUser] = useState(null);
  const userPostListAll = useRef([]);
  const [postList, setPostList] = useState([]);
  const userPostListLength = useRef(0);
  const postModalRef = useRef();
  const [currentPostID, setCurrentPostID] = useState("");
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    setCurrentPostID(e.target.id);
  };

  // init
  useEffect(() => {
    if (ID !== "mypage") {
      userID(ID).then((res) => setOtherUser(res));
      userPost(ID).then((res) => {
        setPostList(res.data.slice(0, 6));
        userPostListAll.current = res.data;
        userPostListLength.current = res.total;
      });
      window.scrollTo(0, 0);
    } else {
      setPostList(userPostList.slice(0, 6));
      userPostListAll.current = userPostList;
      userPostListLength.current = userPostList.length;
    }
  }, [ID, userPostList]);
  // when scroll then show new data
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (postList.length !== 0) {
        if (window.scrollY > 100 && postList.length < 12)
          setPostList(userPostListAll.current.slice(0, 12));
        if (
          window.scrollY > 700 &&
          postList.length !== userPostListLength.current
        )
          setPostList(userPostListAll.current);
      }
    });
  }, [ID, postList.length]);
  return (
    <>
      {ID === "mypage" ? (
        <Page
          ID={ID}
          user={user}
          userPostList={postList}
          userPostListLength={userPostListLength.current}
          handleOpenPostModal={handleOpenPostModal}
        />
      ) : (
        <Page
          ID={ID}
          user={otherUser}
          userPostList={postList}
          setUserPostList={setPostList}
          userPostListLength={userPostListLength.current}
          handleOpenPostModal={handleOpenPostModal}
        />
      )}
      <Post ref={postModalRef} currentPostID={currentPostID} />
    </>
  );
}

export default UserPage;
