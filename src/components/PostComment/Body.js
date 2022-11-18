import { postModalPCSizeHeaderPlaceholder } from "../../utils/placeholder";
import { createComment, userPostComment } from "../../utils/API";
import { handleDate } from "../../utils/Date";
import { DataContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
function Body({
  postID,
  handleOpenModal,
  postUser,
  postMsgList,
  setPostMsgList,
  handleClickSwitchLike,
}) {
  const navigate = useNavigate();
  const { mediaSizePC, user, ownerID, ownerPostListID } =
    useContext(DataContext);
  const [msg, setMsg] = useState("");
  const handleClickAddMsg = () => {
    setMsg("");
    const data = {
      owner: user.id,
      message: msg,
      post: postID,
    };
    createComment(data)
      .then((res) => console.log(res))
      .then(() => {
        userPostComment(postID).then((res) => {
          res.data.map((item) => (item.like = false));
          setPostMsgList(res.data.reverse());
        });
      });
  };
  if (postUser === null || postMsgList === null)
    return <>{postModalPCSizeHeaderPlaceholder}</>;

  return (
    <>
      <div className="post-detail">
        {mediaSizePC && (
          <div className="post-detail-header">
            <div className="user-detail">
              <div className="user-pic">
                <img src={postUser.owner.picture} alt={postUser.owner.id} />
              </div>
              <div
                className="user-account fwb"
                onClick={() => navigate(`/${postUser.owner.id}`)}
              >
                {postUser.owner.firstName.toLocaleLowerCase()}_
                {postUser.owner.lastName.toLocaleLowerCase()}
              </div>
            </div>
            <button
              className="material-symbols-outlined"
              onClick={handleOpenModal}
            >
              more_horiz
            </button>
          </div>
        )}
        <div className="post-detail-main">
          <ul className="post-msg">
            <li className="owner">
              <div className="post-msg-content">
                <div className="user-detail">
                  <div className="user-pic">
                    <img src={postUser.owner.picture} alt={postUser.owner.id} />
                  </div>
                </div>
                <div className="text">
                  <span
                    className="user-account fwb"
                    onClick={() => navigate(`/${postUser.id}`)}
                  >
                    {postUser.owner.firstName.toLocaleLowerCase()}_
                    {postUser.owner.lastName.toLocaleLowerCase()}
                  </span>
                  <span>{postUser.text}</span>
                  {postUser.tags.map((item) => (
                    <button
                      className="tag"
                      key={item.replace(" ", "")}
                      id={item.replace(" ", "")}
                    >
                      #{item.replace(" ", "")}
                    </button>
                  ))}
                  <div className="post-date">
                    {handleDate(postUser.publishDate)}
                  </div>
                </div>
              </div>
            </li>
            {postMsgList &&
              postMsgList.map((item) => (
                <li className="user" key={item.id}>
                  <div className="post-msg-content">
                    <div className="user-detail">
                      <div className="user-pic">
                        <img src={item.owner.picture} alt={item.owner.id} />
                      </div>
                    </div>
                    <div className="text">
                      <span
                        className="user-account fwb"
                        onClick={() => navigate(`/${item.owner.id}`)}
                      >
                        {item.owner.firstName.toLocaleLowerCase()}_
                        {item.owner.lastName.toLocaleLowerCase()}
                      </span>
                      <span>{item.message}</span>
                      <div className="post-date">
                        {handleDate(item.publishDate)}
                        {item.owner.id === ownerID ||
                        ownerPostListID.includes(item.id) ? (
                          <button
                            className="material-symbols-outlined"
                            id={`edit${item.id}`}
                            onClick={handleOpenModal}
                          >
                            more_horiz
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="post-detail-footer">
          {mediaSizePC && (
            <>
              <ul className="post-icons">
                <li className="post-icons-left">
                  <button
                    className={
                      postUser.userLike
                        ? `material-icons-outlined red-color`
                        : "material-symbols-outlined"
                    }
                    onClick={handleClickSwitchLike}
                  >
                    favorite
                  </button>
                  <button className="material-symbols-outlined">
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
              <div className="post-likes">
                <span className="fwb">{postUser.likes}個人</span>都說讚
              </div>
              <div className="post-date">
                {" "}
                {postUser.publishDate.split("T")[0].split("-")[1]} 月{" "}
                {postUser.publishDate.split("T")[0].split("-")[2]},{" "}
                {postUser.publishDate.split("T")[0].split("-")[0]}
              </div>
            </>
          )}
          <label htmlFor="msg">
            {!mediaSizePC && (
              <div className="user-pic-image">
                <div className="user-pic">
                  <img src={postUser.owner.picture} alt={postUser.owner.id} />
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="留言..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              className="blue-color fwb"
              style={msg === "" ? { opacity: ".3", cursor: "default" } : {}}
              onClick={handleClickAddMsg}
            >
              發布
            </button>
          </label>
        </div>
      </div>
    </>
  );
}

export default Body;
