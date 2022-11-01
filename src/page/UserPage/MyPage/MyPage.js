// import { userID, userPost } from "../../../utils/API";
import { DataContext } from "../../../utils/Context";
import { useState, useRef,useContext } from "react";
import Post from "../../../components/Modal/Post/Post";
function MyPage() {
  const {user,userPostList} = useContext(DataContext)
  const postModalRef = useRef();
  const [currentPostID, setCurrentPostID] = useState("");
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    setCurrentPostID(e.target.id);
  };
  return (
    <>
      {user !== null && userPostList !== null ? (
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
                    {user.firstName.toLocaleLowerCase()}_
                    {user.lastName.toLocaleLowerCase()}
                  </li>
                  <li className="edit">
                    <button>編輯個人檔案</button>
                  </li>
                  <li className="set">
                    <button className="icon material-symbols-outlined">
                      settings
                    </button>
                  </li>
                </ul>
                <ul className="userPostFollow">
                  <li>
                    <span>{userPostList.length}</span> 貼文
                  </li>
                  <li>
                    <span>487</span> 位粉絲
                  </li>
                  <li>
                    <span>428</span> 追蹤中
                  </li>
                </ul>
                <ul className="userContent">
                  <li className="name">{user.firstName}</li>
                  <li className="content">•やればできる</li>
                  <li className="content">•Keep on going never give up.</li>
                  <li className="content">--------------------------💐</li>
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
                  <span className="material-symbols-outlined">bookmark</span>
                  <span>我的珍藏</span>
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
                    <div className="post-hover" id={item.id}>
                      <ul>
                        <li>
                          <span className="material-icons-outlined">
                            favorite
                          </span>
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
      ) : null}
    </>
  );
}

export default MyPage;
