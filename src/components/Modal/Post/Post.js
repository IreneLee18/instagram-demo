import { userPostID, userPostComment, createComment } from "../../../utils/API";
import { DataContext } from "../../../utils/Context";
import { handleDate } from "../../../utils/Date";
import { useNavigate } from "react-router-dom";
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import MyPagePostMore from "../PostMore/MyPagePostMore";
function Post({ currentPostID }, ref) {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const postMoreModalRef = useRef();
  const handleOpenModal = () => {
    postMoreModalRef.current.openModal();
  };

  const [postUser, setPostUser] = useState(null);
  const [postMsgList, setPostMsgList] = useState(null);
  useImperativeHandle(ref, () => ({
    openPostModal: () => {
      setModalState(true);
    },
  }));
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
      userPostID(currentPostID).then((res) => setPostUser(res));
      userPostComment(currentPostID).then((res) => {
        res.data.map((item) => (item.like = false));
        setPostMsgList(res.data);
      });
      console.log(currentPostID);
    } else {
      document.body.style.overflow = "scroll";
      setPostUser(null);
      setPostMsgList(null);
    }
  }, [currentPostID, modalState]);
  const [msg, setMsg] = useState("");
  const handleClickAddMsg = () => {
    setMsg("");
    const data = {
      owner: user.id,
      message: msg,
      post: currentPostID,
    };
    createComment(data)
      .then((res) => console.log(res))
      .then(() => {
        userPostComment(currentPostID).then((res) => {
          res.data.map((item) => (item.like = false));
          setPostMsgList(res.data);
        });
      });
  };
  const handleClickSwitchFav = (e) => {
    const list = postMsgList.filter((item) => {
      if (item.id === e.target.id) {
        if (item.like) {
          item.like = false;
        } else {
          item.like = true;
        }
      }
      return item;
    });
    setPostMsgList(list);
  };
  if (!modalState) return null;

  return (
    <>
      {postUser !== null && postMsgList !== null ? (
        <>
          <div className="post modal postDetail">
            <div
              className="modal-close"
              onClick={() => setModalState(false)}
            ></div>
            <div className="modal-content">
              <div className="modal-body post-body postDetail-body">
                <div className="post-pic postDetail-pic">
                  <div>
                    <img src={postUser.image} alt={postUser.id} />
                  </div>
                </div>
                <div className="post-detail">
                  <div className="post-detail-header">
                    <div className="user-detail">
                      <div className="user-pic">
                        <img
                          src={postUser.owner.picture}
                          alt={postUser.owner.id}
                        />
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
                  <div className="post-detail-main">
                    <ul className="post-msg">
                      <li>
                        <div className="post-msg-content">
                          <div className="user-detail">
                            <div className="user-pic">
                              <img
                                src={postUser.owner.picture}
                                alt={postUser.owner.id}
                              />
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
                      {postMsgList.length !== 0 &&
                        postMsgList.map((item) => (
                          <li key={item.id}>
                            <div className="post-msg-content">
                              <div className="user-detail">
                                <div className="user-pic">
                                  <img
                                    src={item.owner.picture}
                                    alt={item.owner.id}
                                  />
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
                                </div>
                              </div>
                            </div>
                            <div id={item.id}>
                              <button
                                className={`post-msg-favBtn ${
                                  item.like
                                    ? `material-icons-outlined red-color`
                                    : "material-symbols-outlined"
                                }`}
                                id={item.id}
                                onClick={handleClickSwitchFav}
                              >
                                favorite
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="post-detail-footer">
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
                    <div className="post-likes">
                      <span className="fwb">{postUser.likes}個人</span>都說讚
                    </div>
                    <div className="post-date">
                      {" "}
                      {postUser.publishDate.split("T")[0].split("-")[1]} 月{" "}
                      {postUser.publishDate.split("T")[0].split("-")[2]},{" "}
                      {postUser.publishDate.split("T")[0].split("-")[0]}
                    </div>
                    <label htmlFor="msg">
                      <input
                        type="text"
                        placeholder="留言..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      <button
                        className="blue-color fwb"
                        style={
                          msg === "" ? { opacity: ".3", cursor: "default" } : {}
                        }
                        onClick={handleClickAddMsg}
                      >
                        發布
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MyPagePostMore ref={postMoreModalRef} />
        </>
      ) : null}
    </>
  );
}

export default forwardRef(Post);
