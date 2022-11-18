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
  // const {
  //   id,
  //   image,
  //   userLike,
  //   likes,
  //   text,
  //   tags,
  //   commentsLength,
  //   publishDate,
  //   openMoreText,
  //   post.owner,
  // } = post;
  const location = useLocation();
  const { owner } = useContext(DataContext);
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
      user: owner.id,
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
            <img src={post.owner.picture} alt={post.id} />
          </div>
          <h2
            className="account"
            id={post.owner.id}
            onClick={() => navigate(`/${post.owner.id}`)}
          >
            {post.owner.firstName.toLowerCase()}_{post.owner.lastName.toLowerCase()}
          </h2>
        </div>
        <button
          className="material-symbols-outlined"
          onClick={handleOpenPostMoreModal}
        >
          more_horiz
        </button>
      </div>
      <div className="post-pic" id={post.id} onDoubleClick={handleClickAddLike}>
        {post.userLike ? (
          <div className="show-fav">
            <span className="material-icons-outlined">favorite</span>
          </div>
        ) : null}
        <img src={post.image} alt={post.id} id={post.id} />
      </div>
      <div className="post-main">
        <ul className="post-icons">
          <li className="post-icons-left">
            <button
              className={
                post.userLike
                  ? `material-icons-outlined red-color`
                  : "material-symbols-outlined"
              }
              id={post.id}
              onClick={handleClickSwitchLike}
            >
              favorite
            </button>
            <button
              className="material-symbols-outlined"
              id={post.id}
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
        <div className="post-likeCount">{post.likes} 個讚</div>
        <div className="post-text">
          {post.openMoreText ? (
            <span className="show-text-group">
              <span className="account" id={post.owner.id}>
                {post.owner.firstName.toLowerCase()}_{post.owner.lastName.toLowerCase()}
              </span>
              <span>{post.text}</span>
              <span className="tag-group">
                {post.tags.map((tag) => (
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
                <span className="account" id={post.owner.id}>
                  {post.owner.firstName.toLowerCase()}_{post.owner.lastName.toLowerCase()}
                </span>
                <span className="hide-text">{post.text}</span>
              </span>
              {post.tags && post.tags.length !== 0 ? (
                <div
                  className="more-text"
                  id={post.id}
                  onClick={handleClickShowMoreText}
                >
                  更多
                </div>
              ) : null}
            </>
          )}
        </div>
        {post.commentsLength !== 0 ? (
          <div className="post-message">
            <button
              className="showMsgBtn"
              id={post.id}
              onClick={handleOpenPostModal}
            >
              查看全部{post.commentsLength}留言
            </button>
          </div>
        ) : null}
        <div className="post-date">{handleDate(post.publishDate)}</div>
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
            id={post.id}
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
          key={post.id}
        >
          {postBody}
        </article>
      ) : (
        <article
          className={location.pathname === "/" ? "post" : `post bd-none`}
          key={post.id}
        >
          {postBody}
        </article>
      )}
    </>
  );
}

export default forwardRef(Post);
