import { allPost, allUser } from "../../utils/API";
import { user } from "../../utils/userData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PostMore from "../../components/Modal/PostMore/PostMore";
function Home() {
  const navigate = useNavigate()
  const [allUserList, setAllUserList] = useState([]);
  const [allPostList, setAllPostList] = useState([]);
  const postMoreModalRef = useRef();
  const handleOpenModal = () => {
    postMoreModalRef.current.openModal();
  };
  const handleDate = (postDate) => {
    const year =
      new Date().getFullYear() - postDate.split("T")[0].split("-")[0];
    const month =
      new Date().getMonth() + 1 - postDate.split("T")[0].split("-")[1];
    const date = new Date().getDate() - postDate.split("T")[0].split("-")[2];
    if (year <= 0 && month <= 0) {
      return `${date} 天前`;
    } else if (year <= 0 && month > 0) {
      return `${month} 個月前`;
    } else {
      return `${year} 年前`;
    }
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
    allUser().then((res) => setAllUserList(res.data));
    allPost(10).then((res) => {
      res.data.map((item) => (item.openMoreText = false));
      setAllPostList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
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
                        <h2 className="account" id={item.owner.id} onClick={()=> navigate(`/${item.owner.id}`)}>
                          {item.owner.firstName.toLowerCase()}_
                          {item.owner.lastName.toLowerCase()}
                        </h2>
                      </div>
                      <button
                        className="material-symbols-outlined"
                        onClick={handleOpenModal}
                      >
                        more_horiz
                      </button>
                    </div>
                    <div className="post-pic">
                      <img src={item.image} alt={item.id} />
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
                      <div className="post-likeCount">{item.likes} 個讚</div>
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
                <img src={user.pic} alt={user.name} />
              </div>
              <div>
                <div className="user-account">{user.account}</div>
                <div className="user-name">{user.name}</div>
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
                    <div className="suggestUser-list-item-detail" id={item.id} onClick={()=>navigate(`/${item.id}`)}>
                      <div className="suggestUser-list-item-pic" id={item.id}>
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
      <PostMore ref={postMoreModalRef} />
    </>
  );
}

export default Home;
