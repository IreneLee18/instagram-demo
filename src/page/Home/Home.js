import { allPost, allUser } from "../../utils/API";
import { handleDate } from "../../utils/Date";
import { DataContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import HomePagePostMore from "../../components/Modal/PostMore/HomePagePostMore";
import Post from "../../components/Modal/Post/Post";
function Home() {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
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
  const handleClickShowMoreText = (e) => {
    console.log(e.target.id);
    const newPostList = allPostList.filter((item) => {
      if (item.id === e.target.id) {
        return (item.openMoreText = true);
      } else {
        return item;
      }
    });
    setAllPostList(newPostList);
    console.log(allPostList, newPostList);
  };
  useEffect(() => {
    // userID("6360036607df00c54b2ce688").then((res) => setUser(res));
    allUser().then((res) => setAllUserList(res.data));
    allPost(10).then((res) => {
      res.data.map((item) => (item.openMoreText = false));
      setAllPostList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      {user !== null ? (
        <>
          <div className="home">
            <div className="home-listGroup">
              <div className="home-list">
                <ul className="home-list-reality">
                  {allUserList.length !== 0 &&
                    allUserList.map((item) => (
                      <li className="reality" key={item.id}>
                        <div className="reality-pic-outside">
                          <div className="reality-pic" id={item.id}>
                            <img
                              src={item.picture}
                              alt={item.firstName}
                              id={item.id}
                            />
                          </div>
                        </div>
                        <div className="reality-title" id={item.id}>
                          <h5 id={item.id}>{item.firstName}</h5>
                        </div>
                      </li>
                    ))}
                </ul>
                <ul className="home-list-postList">
                  {allPostList.length !== 0 &&
                    allPostList.map((item) => (
                      <li className="post" key={item.id}>
                        <div className="post-header">
                          <div className="post-user">
                            <div className="post-user-pic">
                              <img src={item.owner.picture} alt={item.id} />
                            </div>
                            <h2
                              className="account"
                              id={item.owner.id}
                              onClick={() => navigate(`/${item.owner.id}`)}
                            >
                              {item.owner.firstName.toLowerCase()}_
                              {item.owner.lastName.toLowerCase()}
                            </h2>
                          </div>
                          <button
                            className="material-symbols-outlined"
                            onClick={handleOpenPostMoreModal}
                          >
                            more_horiz
                          </button>
                        </div>
                        <div
                          className="post-pic"
                          id={item.id}
                          onClick={handleOpenPostModal}
                        >
                          <img src={item.image} alt={item.id} id={item.id} />
                        </div>
                        <div className="post-main">
                          <ul className="post-icons">
                            <li className="post-icons-left">
                              <button className="material-symbols-outlined">
                                favorite
                              </button>
                              <button className="material-symbols-outlined">
                                maps_ugc
                              </button>

                              <button className="material-symbols-outlined">
                                near_me
                              </button>
                            </li>
                            <li className="post-icons-center"></li>
                            <li className="post-icons-right">
                              <button className="material-symbols-outlined">
                                bookmark
                              </button>
                            </li>
                          </ul>
                          <div className="post-likeCount">
                            {item.likes} 個讚
                          </div>
                          <div className="post-text">
                            {item.openMoreText ? (
                              <div className="show-text-group">
                                <span className="account" id={item.owner.id}>
                                  {item.owner.firstName.toLowerCase()}_
                                  {item.owner.lastName.toLowerCase()}
                                </span>
                                <span>{item.text}</span>
                                <p className="tag-group">
                                  {item.tags.map((tag) => (
                                    <button
                                      className="tag"
                                      key={tag.replace(" ", "")}
                                      id={tag.replace(" ", "")}
                                    >
                                      #{tag.replace(" ", "")}
                                    </button>
                                  ))}
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="hide-text-group">
                                  <span className="account" id={item.owner.id}>
                                    {item.owner.firstName.toLowerCase()}_
                                    {item.owner.lastName.toLowerCase()}
                                  </span>
                                  <span className="hide-text">{item.text}</span>
                                </div>
                                {item.tags && item.tags.length !== 0 ? (
                                  <div
                                    className="more-text"
                                    id={item.id}
                                    onClick={handleClickShowMoreText}
                                  >
                                    更多
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
                          <div className="post-message"></div>
                          <div className="post-date">
                            {handleDate(item.publishDate)}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="home-side">
              <div className="user">
                <div className="user-detail">
                  <div className="user-pic">
                    <img src={user.picture} alt={user.id} />
                  </div>
                  <div>
                    <div
                      className="user-account"
                      onClick={() => navigate("/mypage")}
                    >
                      {user.firstName.toLocaleLowerCase()}_
                      {user.lastName.toLocaleLowerCase()}
                    </div>
                    <div className="user-name">{user.firstName}</div>
                  </div>
                </div>
                <div className="user-switch-account-btn">
                  <button>切換</button>
                </div>
              </div>
              <div className="suggestUser">
                <div className="suggestUser-title">
                  <span>推薦用戶</span>
                  <button>查看全部</button>
                </div>
                <ul className="suggestUser-list">
                  {allUserList.length !== 0 &&
                    allUserList.slice(0, 5).map((item) => (
                      <li
                        className="suggestUser-list-item"
                        key={item.id}
                        id={item.id}
                      >
                        <div
                          className="suggestUser-list-item-detail"
                          id={item.id}
                          onClick={() => navigate(`/${item.id}`)}
                        >
                          <div
                            className="suggestUser-list-item-pic"
                            id={item.id}
                          >
                            <img
                              src={item.picture}
                              alt={item.firstName}
                              id={item.id}
                            />
                          </div>
                          <div
                            className="suggestUser-list-item-account"
                            id={item.id}
                          >
                            <h5 id={item.id}>
                              {item.firstName.toLowerCase()}_
                              {item.lastName.toLowerCase()}
                            </h5>
                          </div>
                        </div>
                        <button
                          className="suggestUser-list-item-follow-btn"
                          id={item.id}
                        >
                          追蹤
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <HomePagePostMore ref={postMoreModalRef} />
          <Post ref={postModalRef} currentPostID={currentPostID} />
        </>
      ) : null}
    </>
  );
}

export default Home;
