import {
  allPost,
  allUser,
  userPostComment,
} from "../../utils/API";
import { useEffect, useState, useRef } from "react";
import HomeSide from "./components/HomeSide";
import HomePagePostMore from "../../components/Modal/PostMore/HomePagePostMore";
import Post from "../../components/Modal/Post/Post";
import HomeReality from "./components/HomeReality";
import HomePost from "./components/HomePost";
function Home() {
  const [allUserList, setAllUserList] = useState([]);
  const [allPostList, setAllPostList] = useState([]);
  const [currentPostID, setCurrentPostID] = useState("");
  const postMoreModalRef = useRef();
  const postModalRef = useRef();
  const handleOpenPostMoreModal = () => {
    postMoreModalRef.current.openModal();
  };
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    console.log(e.target.id);
    setCurrentPostID(e.target.id);
  };

  useEffect(() => {
    allUser().then((res) => setAllUserList(res.data));
    allPost(10)
      .then((res) => {
        res.data.map((item) => (item.openMoreText = false));
        return res.data;
      })
      .then((postList) => {
        postList.forEach((item) =>
          userPostComment(item.id)
            .then((res) => res.data)
            .then((data) => {
              const finalPostList = postList.filter((i) => {
                if (i.id === item.id) {
                  item.comments = data;
                  item.commentsLength = data.length;
                }
                return item;
              });
              setAllPostList(finalPostList);
            })
        );
      });
  }, []);
  return (
    <>
        <>
          <div className="home">
            <div className="home-listGroup">
              <div className="home-list">
                <HomeReality allUserList={allUserList} />
                <HomePost
                  allPostList={allPostList}
                  setAllPostList={setAllPostList}
                  handleOpenPostModal={handleOpenPostModal}
                  handleOpenPostMoreModal={handleOpenPostMoreModal}
                />
              </div>
            </div>
            <HomeSide allUserList={allUserList} />
          </div>
          <HomePagePostMore ref={postMoreModalRef} />
          <Post ref={postModalRef} currentPostID={currentPostID} />
        </>
    </>
  );
}

export default Home;
