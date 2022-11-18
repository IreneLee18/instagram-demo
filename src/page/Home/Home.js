import { allUser } from "../../utils/API";
import { DataContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import HomeSide from "./components/HomeSide";
import HomePagePostMore from "../../components/Modal/PostMore/HomePagePostMore";
import PostModal from "../../components/Modal/Post/PostModal";
import HomeReality from "./components/HomeReality";
import HomePost from "./components/HomePost";
function Home() {
  const { currentPostID, setCurrentPostID, mediaSizePC } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [allUserList, setAllUserList] = useState([]);
  const postMoreModalRef = useRef();
  const postModalRef = useRef();
  const handleOpenPostMoreModal = () => {
    postMoreModalRef.current.openModal();
  };
  const handleOpenPostModal = (e) => {
    if (mediaSizePC) {
      postModalRef.current.openPostModal();
    } else {
      navigate(`${e.target.id}/comment`);
    }
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
        <PostModal ref={postModalRef} currentPostID={currentPostID} />
      </>
    </>
  );
}

export default Home;
