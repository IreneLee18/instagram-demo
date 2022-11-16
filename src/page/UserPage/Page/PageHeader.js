function Header({ ID, user, userPostListLength }) {
  const follow = [
    {
      id: "post",
      number: userPostListLength,
      str: "貼文",
    },
    {
      id: "follower",
      number: userPostListLength * 15,
      str: "位粉絲",
    },
    {
      id: "subscribe",
      number: userPostListLength * 5,
      str: "追蹤中",
    },
  ];
  return (
    <>
      <div className="userPage-header">
        <div className="userAccount-sm">
          <div>
            <span className="material-symbols-outlined">lock_person</span>
            <span>
              {user.firstName.toLowerCase()}_{user.lastName.toLowerCase()}
            </span>
          </div>
        </div>
        <div className="userPicGroup">
          <div className="userPic">
            <img src={user.picture} alt={user.id} />
          </div>
        </div>
        <ul className="userPostFollow userPostFollow-sm">
          {follow.map((item) => (
            <li key={item.id}>
              <span>{item.number}</span>
              <span>{item.str}</span>
            </li>
          ))}
        </ul>
        <div className="userDetail">
          <ul className="userAccount">
            <li className="account">
              {user.firstName.toLowerCase()}_{user.lastName.toLowerCase()}
            </li>
            {ID === "mypage" ? (
              <li className="edit">
                <button>編輯個人檔案</button>
              </li>
            ) : (
              <li className="sendMsg">
                <button>發送訊息</button>
              </li>
            )}
            <li className="set">
              <button className="icon material-symbols-outlined">
                settings
              </button>
            </li>
          </ul>
          <ul className="userPostFollow userPostFollow-pc">
            {follow.map((item) => (
              <li key={item.id}>
                <span>{item.number}</span>
                <span>{item.str}</span>
              </li>
            ))}
          </ul>
          <ul className="userContent">
            {ID === "mypage" ? (
              <>
                <li className="name">{user.firstName}</li>
                <li className="content">•やればできる</li>
                <li className="content">•Keep on going never give up.</li>
                <li className="content">--------------------------💐</li>
                <li className="edit-sm">
                  <button>編輯個人檔案</button>
                </li>
              </>
            ) : (
              <>
                <li className="name">{user.firstName}</li>
                <li className="content">✉️ {user.email}</li>
                <li className="content">📞 {user.phone}</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
