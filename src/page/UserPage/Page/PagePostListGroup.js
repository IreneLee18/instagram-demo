import { forwardRef } from "react";

function PostListGroup({ post, handleOpenPostModal },ref) {
  return (
    <li
    ref={ref}
      className="user-postList-item"
      key={post.id}
      id={post.id}
      onClick={handleOpenPostModal}
    >
      <div className="user-postList-item-hover post-hover" id={post.id}>
        <ul>
          <li>
            <span className="material-icons-outlined">favorite</span>
            <span>{post.likes}</span>
          </li>
          <li>
            <span className="material-icons-outlined">chat_bubble</span>
            <span>0</span>
          </li>
        </ul>
      </div>
      <div className="user-postList-item-pic" id={post.id}>
        <img src={post.image} alt={post.id} id={post.id} />
      </div>
    </li>
  );
}

export default forwardRef(PostListGroup);
