import PostListGroup from "./Page/PagePostListGroup";
import Post from "../../components/PostGroup/Post";
import Header from "./Page/PageHeader";
import PostModal from "../../components/Modal/Post/PostModal";
import usePosts from "../../hook/usePosts";
import { loadingCss } from "../../utils/placeholder";
import { userID, userPostTotal } from "../../utils/API";
import { DataContext } from "../../utils/Context";
import { useParams } from "react-router-dom";
import { useContext, useState, useRef, useEffect, useCallback } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function UserPage() {
  const { ID } = useParams();
  const { ownerID } = useContext(DataContext);
  const [pageNumber, setPageNumber] = useState(0);
  const { results, setResults, isLoading, hasNextPage, setHasNextPage } =
    usePosts(pageNumber, ID === "mypage" ? ownerID : ID);
  const [showMethods, setShowMethods] = useState("all");

  const [postUserID, setPostUserID] = useState(ID === "mypage" ? ownerID : ID);
  const [user, setUser] = useState(null);
  const totalListLength = useRef(0);
  const postModalRef = useRef();
  const [currentPostID, setCurrentPostID] = useState("");
  const handleOpenPostModal = (e) => {
    postModalRef.current.openPostModal();
    setCurrentPostID(e.target.id);
  };

  // init:每次渲染畫面時先全部淨空
  useEffect(() => {
    setPostUserID(ID === "mypage" ? ownerID : ID);
    setResults([]);
    setUser(null);
    setHasNextPage(false);
    totalListLength.current = 0;
    setCurrentPostID("");
  }, [ID, ownerID, setHasNextPage, setResults]);

  // init:取得資料
  useEffect(() => {
    userPostTotal(postUserID).then((totalLength) => {
      totalListLength.current = totalLength;
    });
    userID(postUserID).then((res) => {
      setUser(res);
    });
    window.scrollTo(0, 0);
  }, [postUserID]);

  const intersectionObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();
      intersectionObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (post) intersectionObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const postItem = results.map((post, i) =>
    results.length === i + 1 ? (
      <PostListGroup
        key={post.id}
        post={post}
        handleOpenPostModal={handleOpenPostModal}
        ref={lastPostRef}
      />
    ) : (
      <PostListGroup
        key={post.id}
        post={post}
        handleOpenPostModal={handleOpenPostModal}
      />
    )
  );

  if (user === null) return;

  return (
    <>
      <div className="userPage">
        <Header
          ID={ID}
          user={user}
          userPostListLength={totalListLength.current}
        />
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
          <ul className="user-postList">
            {showMethods === "all" && results && <>{postItem}</>}
          </ul>
          {isLoading &&
            results.length !== 0 &&
            results.length !== totalListLength.current && (
              <FadeLoader
                color="#262626"
                width={3}
                margin={0}
                cssOverride={loadingCss}
              />
            )}
          {showMethods === "one" ? (
            <ul>
              {results.map((item) => (
                <Post
                  key={item.id}
                  post={item}
                  allPostList={results}
                  setAllPostList={setResults}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <PostModal ref={postModalRef} currentPostID={currentPostID} />
    </>
  );
}

export default UserPage;
