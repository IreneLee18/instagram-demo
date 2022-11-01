import { userID, userPost } from "../../../utils/API";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Post from "../../../components/Modal/Post/Post";

function OtherPage() {
  const { ID } = useParams();
  const [user, setUser] = useState(null);
  const [userPostList, setUserPostList] = useState([]);
  const userPostListLength = useRef(0);
  const postModalRef = useRef();
  const [currentPostID, setCurrentPostID] = useState("");
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    console.log(e.target.id);
    setCurrentPostID(e.target.id);
  };
  useEffect(() => {
    userID(ID).then((res) => setUser(res));
    userPost(ID).then((res) => {
      setUserPostList(res.data.slice(0, 6));
      userPostListLength.current = res.total;
    });
  }, [ID]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (userPostList.length !== 0) {
        if (window.screen.width > 820) {
          console.log(window.scrollY, window.innerHeight / 3);
          if (
            window.scrollY > window.innerHeight / 2 &&
            userPostList.length < 12 &&
            userPostList.length !== userPostListLength.current
          )
            userPost(ID).then((res) => setUserPostList(res.data.slice(0, 12)));
          if (
            window.scrollY > window.innerHeight * 1.5 &&
            userPostList.length !== userPostListLength.current
          )
            userPost(ID).then((res) => setUserPostList(res.data));
        }
      }
    });
    // ws=100
    // console.log(window.scrollY, window.innerHeight);
  }, [ID, userPostList.length]);
  if (user === null) return null;
  return (
    <>
      <div className="userPage">
        <div className="userPage-header">
          <div className="userPicGroup">
            <div className="userPic">
              <img src={user.picture} alt={user.id} />
            </div>
          </div>
          <div className="userDetail">
            <ul className="userAccount">
              <li className="account">
                {user.firstName.toLowerCase()}_{user.lastName.toLowerCase()}
              </li>
              <li className="sendMsg">
                <button>發送訊息</button>
              </li>
              <li className="set">
                <button className="icon material-symbols-outlined">
                  settings
                </button>
              </li>
            </ul>
            <ul className="userPostFollow">
              <li>
                <span>{userPostListLength.current}</span> 貼文
              </li>
              <li>
                <span>{userPostListLength.current * 15}</span> 位粉絲
              </li>
              <li>
                <span>{userPostListLength.current * 5}</span> 追蹤中
              </li>
            </ul>
            <ul className="userContent">
              <li className="name">{user.firstName}</li>
              <li className="content">✉️ {user.email}</li>
              <li className="content">📞 {user.phone}</li>
            </ul>
          </div>
        </div>
        <div className="userPage-main">
          <ul className="select-show-postList">
            <li className="selected">
              <span className="material-symbols-outlined">apps</span>
              <span>貼文</span>
            </li>
            <li>
              <span className="material-symbols-outlined">person_pin</span>
              <span>已標註</span>
            </li>
          </ul>
          <ul className="user-postList">
            {userPostList.map((item) => (
              <li
                className="user-postList-item"
                key={item.id}
                id={item.id}
                onClick={handleOpenPostModal}
              >
                <div className="post-hover"
                id={item.id}>
                  <ul>
                    <li>
                      <span className="material-icons-outlined">favorite</span>
                      <span>{item.likes}</span>
                    </li>
                    <li>
                      <span className="material-icons-outlined">
                        chat_bubble
                      </span>
                      <span>0</span>
                    </li>
                  </ul>
                </div>
                <div className="post-pic">
                  <img src={item.image} alt={item.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Post ref={postModalRef} currentPostID={currentPostID} />
    </>
  );
}

export default OtherPage;
