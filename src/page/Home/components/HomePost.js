import Post from "../../../components/PostGroup/Post";
import usePosts from "../../../hook/usePosts";
import { loadingCss,postPlaceholder } from "../../../utils/placeholder";
import { useState, useRef, useCallback } from "react";
import FadeLoader from "react-spinners/FadeLoader"

function HomePost({ handleOpenPostModal, handleOpenPostMoreModal }) {
  const [pageNumber, setPageNumber] = useState(0);
  const { results, setResults, isLoading, hasNextPage } = usePosts(pageNumber);

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

  const postArticle = results.map((post, i) => {
    if (results.length === i + 1) {
      return (
        <Post
          key={post.id}
          post={post}
          allPostList={results}
          setAllPostList={setResults}
          handleOpenPostMoreModal={handleOpenPostMoreModal}
          handleOpenPostModal={handleOpenPostModal}
          ref={lastPostRef}
        />
      );
    }
    return (
      <Post
        key={post.id}
        post={post}
        allPostList={results}
        setAllPostList={setResults}
        handleOpenPostMoreModal={handleOpenPostMoreModal}
        handleOpenPostModal={handleOpenPostModal}
      />
    );
  });

  return (
    <section className="home-list-postList">
      {postArticle}

      {results.length === 0 && (
        <article className="post">{postPlaceholder}</article>
      )}

      {isLoading && results.length !== 0 && (
        <FadeLoader
          color="#262626"
          width={3}
          margin={0}
          cssOverride={loadingCss}
        />
      )}
    </section>
  );
}

export default HomePost;
