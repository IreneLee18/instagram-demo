import usePost from "../../../hook/usePost";
import {
  userPostComment,
  deleteComment,
  userPost,
  deleteUsePostID,
} from "../../../utils/API";
import { DataContext } from "../../../utils/Context";
import {
  useState,
  useRef,
  useContext,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import MyPagePostMoreModal from "../PostMore/MyPagePostMoreModal";
import HomePagePostMoreModal from "../PostMore/HomePagePostMoreModal";
import PostMoreCommentModal from "../PostMore/PostMoreCommentModal";
import Body from "../../PostComment/Body";
function PostModal({ currentPostID }, ref) {
  const { setOwnerPostList, ownerID, ownerPostListID, setOwnerPostListID } =
    useContext(DataContext);
  const {
    postUser,
    postMsgList,
    setPostMsgList,
    handleClickSwitchLike,
    getPostComment,
    initPostComment,
  } = usePost(currentPostID);
  const [modalState, setModalState] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const myPostMoreModalRef = useRef();
  const otherPostMoreModalRef = useRef();
  const postMoreCommentModalRef = useRef();

  const handleOpenModal = (e) => {
    if (
      !ownerPostListID.includes(currentPostID) &&
      !e.target.id.includes("edit")
    ) {
      otherPostMoreModalRef.current.openModal();
    } else if (e.target.id.includes("edit")) {
      postMoreCommentModalRef.current.openModal();
      setCurrentComment(e.target.id.substr(4, e.target.length));
    } else {
      myPostMoreModalRef.current.openModal();
    }
  };

  useImperativeHandle(ref, () => ({
    openPostModal: () => {
      setModalState(true);
    },
  }));
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
      getPostComment();
    } else {
      document.body.style.overflow = "scroll";
      initPostComment();
    }
  }, [getPostComment, initPostComment, modalState]);

  const handleClickDeletePost = () => {
    deleteUsePostID(currentPostID).then(() => {
      setModalState(false);
      myPostMoreModalRef.current.closeModal();
      userPost(ownerID).then((res) => {
        setOwnerPostList(res.data);
        const list = [];
        res.data.forEach((item) => list.push(item.id));
        setOwnerPostListID(list);
      });
    });
  };
  const handleClickDeleteComment = () => {
    deleteComment(currentComment).then(() => {
      postMoreCommentModalRef.current.closeModal();
      userPost(ownerID).then(() => {
        userPostComment(currentPostID).then((res) => {
          res.data.map((item) => (item.like = false));
          setPostMsgList(res.data);
        });
      });
    });
  };

  if (!modalState) return null;

  return (
    <>
      {postUser !== null && (
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
                <Body
                  postID={currentPostID}
                  handleOpenModal={handleOpenModal}
                  postUser={postUser}
                  postMsgList={postMsgList}
                  setPostMsgList={setPostMsgList}
                  handleClickSwitchLike={handleClickSwitchLike}
                />
              </div>
            </div>
          </div>
          <MyPagePostMoreModal
            ref={myPostMoreModalRef}
            handleClickDeletePost={handleClickDeletePost}
          />
          <HomePagePostMoreModal ref={otherPostMoreModalRef} />
          <PostMoreCommentModal
            ref={postMoreCommentModalRef}
            handleClickDeleteComment={handleClickDeleteComment}
          />
        </>
      )}
    </>
  );
}

export default forwardRef(PostModal);
