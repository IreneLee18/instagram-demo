import { useState } from "react";
import Header from "./PageHeader";
import PostListGroup from "./PagePostListGroup";
import Post from "../../../components/PostGroup/Post";

function Page({
  ID,
  user,
  userPostList,
  setUserPostList,
  userPostListLength,
  handleOpenPostModal,
}) {
  const [showMethods, setShowMethods] = useState("all");
  if (user === null) return;
  return (
    <>
      <div className="userPage">
        <Header ID={ID} user={user} userPostListLength={userPostListLength} />
        <div className="userPage-main">
          <ul className="select-show-postList">
            <li
              className={showMethods === "all" ? "selected" : ""}
              id="all"
              onClick={(e) => setShowMethods(e.target.id)}
            >
              <span className="material-symbols-outlined" id="all">
                apps
              </span>
              <span id="all">貼文</span>
            </li>
            <li
              className={`showOnePost ${
                showMethods === "one" ? "selected" : ""
              }`}
              id="one"
              onClick={(e) => setShowMethods(e.target.id)}
            >
              <span className="material-symbols-outlined" id="one">
                crop_square
              </span>
              <span id="one">單篇</span>
            </li>
            {ID === "mypage" ? (
              <li>
                <span className="material-symbols-outlined">bookmark</span>
                <span>我的珍藏</span>
              </li>
            ) : null}
            <li>
              <span className="material-symbols-outlined">person_pin</span>
              <span>已標註</span>
            </li>
          </ul>
          {showMethods === "all" ? (
            <PostListGroup
              userPostList={userPostList}
              handleOpenPostModal={handleOpenPostModal}
            />
          ) : null}
          {showMethods === "one" ? (
            <ul>
              {userPostList.map((item) => (
                <Post
                  key={item.id}
                  post={item}
                  allPostList={userPostList}
                  setAllPostList={setUserPostList}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Page;
