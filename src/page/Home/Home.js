import { allUser } from "../../utils/API";
import { useEffect, useState, useRef } from "react";
import HomeSide from "./components/HomeSide";
import HomePagePostMore from "../../components/Modal/PostMore/HomePagePostMore";
import Post from "../../components/Modal/Post/Post";
import HomeReality from "./components/HomeReality";
import HomePost from "./components/HomePost";
function Home() {
  const [allUserList, setAllUserList] = useState([]);
  const [currentPostID, setCurrentPostID] = useState("");
  const postMoreModalRef = useRef();
  const postModalRef = useRef();
  const handleOpenPostMoreModal = () => {
    postMoreModalRef.current.openModal();
  };
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    setCurrentPostID(e.target.id);
  };

  useEffect(() => {
    allUser().then((res) => setAllUserList(res.data));
  }, []);

  return (
    <>
      <>
        <header className="header-home">
          <div className="header-home-logo"></div>
          <button className="material-symbols-outlined">favorite</button>
        </header>
        <div className="home">
          <div className="home-listGroup">
            <div className="home-list">
              <HomeReality allUserList={allUserList} />
              <HomePost
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
