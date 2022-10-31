import { user, userPostList } from "../../../utils/userData";

function MyPage() {
  return (
    <>
      <div className="userPage">
        <div className="userPage-header">
          <div className="userPicGroup">
            <div className="userPic">
              <img src={user.pic} alt={user.name} />
            </div>
          </div>
          <div className="userDetail">
            <ul className="userAccount">
              <li className="account">{user.account}</li>
              <li className="edit">
                <button>編輯個人檔案</button>
              </li>
              <li className="set">
                <button className="icon material-symbols-outlined">
                  settings
                </button>
              </li>
            </ul>
            <ul className="userPostFollow">
              <li>
                <span>176</span> 貼文
              </li>
              <li>
                <span>487</span> 位粉絲
              </li>
              <li>
                <span>428</span> 追蹤中
              </li>
            </ul>
            <ul className="userContent">
              <li className="name">{user.name}</li>
              {user.content.map((item) => (
                <li className="content" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="userPage-main">
          <ul className="select-show-postList">
            <li className="selected">
              <span className="material-symbols-outlined">apps</span>
              <span>貼文</span>
            </li>
            <li>
              <span className="material-symbols-outlined">bookmark</span>
              <span>我的珍藏</span>
            </li>
            <li>
              <span className="material-symbols-outlined">person_pin</span>
              <span>已標註</span>
            </li>
          </ul>
          <ul className="user-postList">
            {userPostList.map((item) => (
              <li className="user-postList-item" key={item.id}>
                <div className="post-hover">
                  <ul>
                    <li>
                      <span className="material-icons-outlined">favorite</span>
                      <span>{item.likes}</span>
                    </li>
                    <li>
                      <span className="material-icons-outlined">
                        chat_bubble
                      </span>
                      <span>0</span>
                    </li>
                  </ul>
                </div>
                <div className="post-pic">
                  <img src={item.image} alt={item.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyPage;
