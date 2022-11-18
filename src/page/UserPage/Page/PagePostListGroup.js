function PostListGroup({ userPostList, handleOpenPostModal }) {
  return (
    <ul className="user-postList">
      {userPostList.map((item) => (
        <li
          className="user-postList-item"
          key={item.id}
          id={item.id}
          onClick={handleOpenPostModal}
        >
          <div className="user-postList-item-hover" id={item.id}>
            <ul>
              <li>
                <span className="material-icons-outlined">favorite</span>
                <span>{item.likes}</span>
              </li>
              <li>
                <span className="material-icons-outlined">chat_bubble</span>
                <span>0</span>
              </li>
            </ul>
          </div>
          <div className="user-postList-item-pic" id={item.id}>
            <img src={item.image} alt={item.id}  id={item.id}/>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostListGroup;
