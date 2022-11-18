import Body from "../../components/PostComment/Body";
import usePost from "../../hook/usePost";
import { DataContext } from "../../utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

function PostComment() {
  const navigate = useNavigate();
  const { ID } = useParams();
  const { mediaSizePC } = useContext(DataContext);
  const { postUser, postMsgList, setPostMsgList, getPostComment } = usePost(ID);

  useEffect(() => {
    if (!mediaSizePC) {
      getPostComment();
    }
  }, [getPostComment, mediaSizePC]);

  return (
    <div className="post detail-mobile">
      <div className="header">
        <button
          className="material-symbols-outlined"
          onClick={() => navigate("/")}
        >
          arrow_back_ios
        </button>
        <div>留言</div>
        <button className="material-symbols-outlined">near_me</button>
      </div>
      <Body
        postID={ID}
        postUser={postUser}
        postMsgList={postMsgList}
        setPostMsgList={setPostMsgList}
      />
    </div>
  );
}

export default PostComment;
