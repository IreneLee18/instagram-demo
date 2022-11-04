import {
  userPostID,
  updateUsePostID,
  userPostComment,
  createComment,
} from "../../../utils/API";
import { DataContext } from "../../../utils/Context";
import { handleDate } from "../../../utils/Date";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
function HomePost({
  allPostList,
  setAllPostList,
  handleOpenPostModal,
  handleOpenPostMoreModal,
}) {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const handleClickShowMoreText = (e) => {
    userPostID(e.target.id)
      .then((res) => res.text)
      .then((fullText) => {
        const newPostList = allPostList.filter((item) => {
          if (item.id === e.target.id) {
            item.openMoreText = true;
            item.text = fullText;
          }
          return item;
        });
        setAllPostList(newPostList);
        console.log(allPostList, newPostList);
      });
  };
  const [msg, setMsg] = useState("");
  const handleClickAddMsg = (e) => {
    setMsg("");
    const data = {
      owner: user.id,
      message: msg,
      post: e.target.id,
    };
    createComment(data)
      .then((res) => console.log(res))
      .then(() => {
        userPostComment(e.target.id).then((data) => {
          const finalPostList = allPostList.filter((item) => {
            if (item.id === e.target.id) {
              item.comments.push(data);
              item.commentsLength++;
            }
            return item;
          });
          setAllPostList(finalPostList);
        });
      });
  };

  // only add like : click picture
  const handleClickAddLike = (e) => {
    allPostList.forEach((item) => {
      if (item.id === e.target.id && !item.userLike) {
        userPostID(e.target.id)
          .then((res) => {
            const list = { ...res };
            list.likes++;
            return list;
          })
          .then((data) => {
            updateUsePostID(e.target.id, data).then((res) => {
              const finalList = allPostList.filter((item) => {
                if (item.id === res.id) {
                  item.userLike = true;
                  item.likes++;
                }
                return item;
              });
              setAllPostList(finalList);
            });
          });
      }
    });
  };
  // can add like and delete like : click fav icon
  const handleClickSwitchLike = (e) => {
    allPostList.forEach((item) => {
      if (item.id === e.target.id) {
        if (item.userLike) {
          userPostID(e.target.id)
            .then((res) => {
              const list = { ...res };
              list.likes--;
              return list;
            })
            .then((data) => {
              updateUsePostID(e.target.id, data).then((res) => {
                const finalList = allPostList.filter((item) => {
                  if (item.id === res.id) {
                    item.userLike = false;
                    item.likes--;
                  }
                  return item;
                });
                setAllPostList(finalList);
              });
            });
        } else {
          userPostID(e.target.id)
            .then((res) => {
              const list = { ...res };
              list.likes++;
              return list;
            })
            .then((data) => {
              updateUsePostID(e.target.id, data).then((res) => {
                const finalList = allPostList.filter((item) => {
                  if (item.id === res.id) {
                    item.userLike = true;
                    item.likes++;
                  }
                  return item;
                });
                setAllPostList(finalList);
              });
            });
        }
      }
    });
  };

  return (
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
              onDoubleClick={handleClickAddLike}
            >
              {item.userLike ? (
                <div className="show-fav">
                  <span className="material-icons-outlined">favorite</span>
                </div>
              ) : null}
              <img src={item.image} alt={item.id} id={item.id} />
            </div>
            <div className="post-main">
              <ul className="post-icons">
                <li className="post-icons-left">
                  <button
                    className={
                      item.userLike
                        ? `material-icons-outlined red-color`
                        : "material-symbols-outlined"
                    }
                    id={item.id}
                    onClick={handleClickSwitchLike}
                  >
                    favorite
                  </button>
                  <button
                    className="material-symbols-outlined"
                    id={item.id}
                    onClick={handleOpenPostModal}
                  >
                    maps_ugc
                  </button>

                  <button className="material-symbols-outlined">near_me</button>
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
                  <span className="show-text-group">
                    <span className="account" id={item.owner.id}>
                      {item.owner.firstName.toLowerCase()}_
                      {item.owner.lastName.toLowerCase()}
                    </span>
                    <span>{item.text}</span>
                    <span className="tag-group">
                      {item.tags.map((tag) => (
                        <button
                          className="tag"
                          key={tag.replace(" ", "")}
                          id={tag.replace(" ", "")}
                        >
                          #{tag.replace(" ", "")}
                        </button>
                      ))}
                    </span>
                  </span>
                ) : (
                  <>
                    <span className="hide-text-group">
                      <span className="account" id={item.owner.id}>
                        {item.owner.firstName.toLowerCase()}_
                        {item.owner.lastName.toLowerCase()}
                      </span>
                      <span className="hide-text">{item.text}</span>
                    </span>
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
              {item.commentsLength !== 0 ? (
                <div className="post-message">
                  <button
                    className="showMsgBtn"
                    id={item.id}
                    onClick={handleOpenPostModal}
                  >
                    查看全部{item.commentsLength}留言
                  </button>
                </div>
              ) : null}
              <div className="post-date">{handleDate(item.publishDate)}</div>
            </div>
            <div className="post-footer">
              <label htmlFor="msg">
                <input
                  type="text"
                  placeholder="留言..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button
                  className="blue-color fwb"
                  style={msg === "" ? { opacity: ".3", cursor: "default" } : {}}
                  id={item.id}
                  onClick={handleClickAddMsg}
                >
                  發布
                </button>
              </label>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default HomePost;
