import { DataContext } from "../../../utils/Context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { suggestSidePlaceholder } from "../../../utils/placeholder";
const array5 = [...Array(5).keys()];

function HomeSide({ allUserList }) {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="home-side">
      <div className="user">
        <div className="user-detail">
          <div className="user-pic">
            <img src={user.picture} alt={user.id} />
          </div>
          <div>
            <div className="user-account" onClick={() => navigate("/mypage")}>
              {user.firstName.toLocaleLowerCase()}_
              {user.lastName.toLocaleLowerCase()}
            </div>
            <div className="user-name">{user.firstName}</div>
          </div>
        </div>
        <div className="user-switch-account-btn">
          <button>切換</button>
        </div>
      </div>
      <div className="suggestUser">
        <div className="suggestUser-title">
          <span>推薦用戶</span>
          <button>查看全部</button>
        </div>
        <ul className="suggestUser-list">
          {allUserList.length !== 0
            ? allUserList.slice(0, 5).map((item) => (
                <li
                  className="suggestUser-list-item"
                  key={item.id}
                  id={item.id}
                >
                  <div
                    className="suggestUser-list-item-detail"
                    id={item.id}
                    onClick={() => navigate(`/${item.id}`)}
                  >
                    <div className="suggestUser-list-item-pic" id={item.id}>
                      <img
                        src={item.picture}
                        alt={item.firstName}
                        id={item.id}
                      />
                    </div>
                    <div className="suggestUser-list-item-account" id={item.id}>
                      <h5 id={item.id}>
                        {item.firstName.toLowerCase()}_
                        {item.lastName.toLowerCase()}
                      </h5>
                    </div>
                  </div>
                  <button
                    className="suggestUser-list-item-follow-btn"
                    id={item.id}
                  >
                    追蹤
                  </button>
                </li>
              ))
            : array5.map((item) => (
                <li className="suggestUser-list-item" key={item}>
                  {suggestSidePlaceholder}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeSide;
