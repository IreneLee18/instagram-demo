import {
  userPostID,
  updateUsePostID,
  userPostComment,
  createComment,
} from "../../utils/API";
import { handleDate } from "../../utils/Date";
import { DataContext } from "../../utils/Context";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, forwardRef } from "react";

function Post(
  {
    post,
    allPostList,
    setAllPostList,
    handleOpenPostMoreModal,
    handleOpenPostModal,
  },
  ref
) {
  const {
    id,
    image,
    userLike,
    likes,
    text,
    tags,
    commentsLength,
    publishDate,
    openMoreText,
    owner,
  } = post;
  const location = useLocation();
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
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
      });
  };
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

  const postBody = (
    <>
      <div className="post-header">
        <div className="post-user">
          <div className="post-user-pic">
            <img src={owner.picture} alt={id} />
          </div>
          <h2
            className="account"
            id={owner.id}
            onClick={() => navigate(`/${owner.id}`)}
          >
            {owner.firstName.toLowerCase()}_{owner.lastName.toLowerCase()}
          </h2>
        </div>
        <button
          className="material-symbols-outlined"
          onClick={handleOpenPostMoreModal}
        >
          more_horiz
        </button>
      </div>
      <div className="post-pic" id={id} onDoubleClick={handleClickAddLike}>
        {userLike ? (
          <div className="show-fav">
            <span className="material-icons-outlined">favorite</span>
          </div>
        ) : null}
        <img src={image} alt={id} id={id} />
      </div>
      <div className="post-main">
        <ul className="post-icons">
          <li className="post-icons-left">
            <button
              className={
                userLike
                  ? `material-icons-outlined red-color`
                  : "material-symbols-outlined"
              }
              id={id}
              onClick={handleClickSwitchLike}
            >
              favorite
            </button>
            <button
              className="material-symbols-outlined"
              id={id}
              onClick={handleOpenPostModal}
            >
              maps_ugc
            </button>
            <button className="material-symbols-outlined">near_me</button>
          </li>
          <li className="post-icons-center"></li>
          <li className="post-icons-right">
            <button className="material-symbols-outlined">bookmark</button>
          </li>
        </ul>
        <div className="post-likeCount">{likes} 個讚</div>
        <div className="post-text">
          {openMoreText ? (
            <span className="show-text-group">
              <span className="account" id={owner.id}>
                {owner.firstName.toLowerCase()}_{owner.lastName.toLowerCase()}
              </span>
              <span>{text}</span>
              <span className="tag-group">
                {tags.map((tag) => (
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
                <span className="account" id={owner.id}>
                  {owner.firstName.toLowerCase()}_{owner.lastName.toLowerCase()}
                </span>
                <span className="hide-text">{text}</span>
              </span>
              {tags && tags.length !== 0 ? (
                <div
                  className="more-text"
                  id={id}
                  onClick={handleClickShowMoreText}
                >
                  更多
                </div>
              ) : null}
            </>
          )}
        </div>
        {commentsLength !== 0 ? (
          <div className="post-message">
            <button
              className="showMsgBtn"
              id={id}
              onClick={handleOpenPostModal}
            >
              查看全部{commentsLength}留言
            </button>
          </div>
        ) : null}
        <div className="post-date">{handleDate(publishDate)}</div>
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
            id={id}
            onClick={handleClickAddMsg}
          >
            發布
          </button>
        </label>
      </div>
    </>
  );

  return (
    <>
      {ref ? (
        <article
          ref={ref}
          className={location.pathname === "/" ? "post" : `post bd-none`}
          key={id}
        >
          {postBody}
        </article>
      ) : (
        <article
          className={location.pathname === "/" ? "post" : `post bd-none`}
          key={id}
        >
          {postBody}
        </article>
      )}
    </>
  );
}

export default forwardRef(Post);
