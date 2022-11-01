import { allUser } from "../../utils/API";
import { DataContext } from "../../utils/Context";
import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
let allUserList = [];
allUser().then((res) => {
  allUserList = res.data;
});
function LayoutSide() {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const [moreToggle, setMoreToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [currentSearchList, setCurrentSearchList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  // add current search list
  const handleClickAddCurrentSearch = (e) => {
    const searchList = currentSearchList;
    const searchListID = currentSearchList.map((item) => item.id);
    allUserList.forEach((item) => {
      if (item.id === e.target.id && !searchListID.includes(e.target.id)) {
        searchList.unshift(item);
        searchListID.unshift(item.id);
        setCurrentSearchList(searchList);
      }
    });
    handleClickGoUserPage(e);
  };
  // go selected user page
  const handleClickGoUserPage = (e) => {
    setIsSearch(false);
    setSearchInput("");
    setSearchToggle(false);
    navigate(`/${e.target.id}`);
  };
  // delete select account in currentSearchList
  const handleClickDeleteAccount = (e) => {
    const searchList = currentSearchList.filter(
      (item) => item.id !== e.target.id
    );
    setCurrentSearchList(searchList);
  };
  useEffect(() => {
    if (searchInput === "") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
  }, [searchInput]);

  // search 'account' include 'search input', then show include account.
  useEffect(() => {
    if (allUserList.length !== 0 && searchInput !== "") {
      const searchList = [];
      allUserList.forEach((item) => {
        if (
          item.firstName.toLowerCase().includes(searchInput) ||
          item.lastName.toLowerCase().includes(searchInput)
        ) {
          searchList.push(item);
          setSearchList(searchList);
        }
      });
    }
  }, [searchInput]);
  return (
    <>
      {user !== null ? (
        <>
          <div className="side">
            <div
              className="side-all"
              style={searchToggle ? { width: "5%" } : { width: "17%" }}
            >
              <div>
                <div className="side-logo">
                  <div
                    className={searchToggle ? "side-logo-sm" : "side-logo-big"}
                    onClick={() => navigate("/")}
                  ></div>
                </div>
                <ul className="side-list">
                  <li onClick={() => navigate("/")}>
                    <span className="icon material-symbols-outlined">home</span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      首頁
                    </span>
                  </li>
                  <li
                    onClick={() => setSearchToggle((state) => !state)}
                    style={
                      searchToggle
                        ? { paddingLeft: "0px" }
                        : { paddingLeft: "12px" }
                    }
                  >
                    <span
                      className={`icon material-symbols-outlined ${
                        searchToggle ? "icon-circle" : ""
                      }`}
                    >
                      search
                    </span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      搜尋
                    </span>
                  </li>
                  <li>
                    <span className="icon material-symbols-outlined">
                      explore
                    </span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      探索
                    </span>
                  </li>
                  <li>
                    <span className="icon material-symbols-outlined">chat</span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      訊息
                    </span>
                  </li>
                  <li>
                    <span className="icon material-symbols-outlined">
                      favorite
                    </span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      通知
                    </span>
                  </li>
                  <li>
                    <span className="icon material-icons-outlined">
                      add_circle_outline
                    </span>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      建立
                    </span>
                  </li>
                  <li onClick={() => navigate("/mypage")}>
                    <div className="user-pic">
                      <img src={user.picture} alt={user.id} />
                    </div>
                    <span style={searchToggle ? { display: "none" } : {}}>
                      個人檔案
                    </span>
                  </li>
                </ul>
                <div className="side-more">
                  <div onClick={() => setMoreToggle((state) => !state)}>
                    <span className="icon material-symbols-outlined">menu</span>
                    <span
                      className={moreToggle ? "fwb" : ""}
                      style={searchToggle ? { display: "none" } : {}}
                    >
                      更多
                    </span>
                  </div>
                  <ul className={moreToggle ? `side-moreBtnGroup` : `d-none`}>
                    <li>
                      <span>設定</span>
                      <span className="icon material-symbols-outlined">
                        settings
                      </span>
                    </li>
                    <li>
                      <span>我的珍藏</span>
                      <span className="icon material-symbols-outlined">
                        bookmark
                      </span>
                    </li>
                    <li>
                      <span>回報問題</span>
                      <span className="icon material-symbols-outlined">
                        report
                      </span>
                    </li>
                    <li>
                      <span>切換帳號</span>
                    </li>
                    <li>
                      <span>登出</span>
                    </li>
                  </ul>
                </div>
              </div>
              {searchToggle ? (
                <div className="side-search">
                  <h2>搜尋</h2>
                  <label htmlFor="search">
                    <input
                      type="text"
                      placeholder="搜尋"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value.trim())}
                    />
                    <button
                      className="material-icons-round"
                      onClick={() => setSearchInput("")}
                    >
                      cancel
                    </button>
                  </label>
                  <div className="side-search-list">
                    {isSearch && searchList.length !== 0 ? (
                      <ul>
                        {searchList.map((item) => (
                          <li
                            className="search-card"
                            key={item.id}
                            id={item.id}
                            onClick={handleClickAddCurrentSearch}
                          >
                            <div className="search-card-main" id={item.id}>
                              <div className="search-card-pic" id={item.id}>
                                <img
                                  src={item.picture}
                                  alt={item.firstName.toLowerCase()}
                                  id={item.id}
                                />
                              </div>
                              <div className="search-card-title" id={item.id}>
                                <h4 id={item.id}>
                                  {item.firstName.toLowerCase()}_
                                  {item.lastName.toLowerCase()}
                                </h4>
                                <h5 id={item.id}>
                                  {item.firstName.toLowerCase()}
                                </h5>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="side-search-recently">
                        <div className="recently">
                          <h3>最近</h3>
                          <button onClick={() => setCurrentSearchList([])}>
                            全部清除
                          </button>
                        </div>
                        {currentSearchList.length !== 0 ? (
                          <ul>
                            {currentSearchList.map((item) => (
                              <li
                                className="search-card"
                                key={item.id}
                                id={item.id}
                                onClick={handleClickGoUserPage}
                              >
                                <div className="search-card-main" id={item.id}>
                                  <div className="search-card-pic" id={item.id}>
                                    <img
                                      src={item.picture}
                                      alt={item.firstName.toLowerCase()}
                                      id={item.id}
                                    />
                                  </div>
                                  <div
                                    className="search-card-title"
                                    id={item.id}
                                  >
                                    <h4 id={item.id}>
                                      {item.firstName.toLowerCase()}_
                                      {item.lastName.toLowerCase()}
                                    </h4>
                                    <h5 id={item.id}>
                                      {item.firstName.toLowerCase()}
                                    </h5>
                                  </div>
                                </div>
                                <div className="search-card-footer">
                                  <button
                                    id={item.id}
                                    onClick={handleClickDeleteAccount}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>沒有近期搜尋紀錄。</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="main">
            <Outlet />
          </div>
        </>
      ) : null}
    </>
  );
}

export default LayoutSide;
