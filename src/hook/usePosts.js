import { useState, useRef, useEffect } from "react";
import { allPost } from "../utils/API";
const usePosts = (pageNumber=0) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const isCalled = useRef(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    // console.log(signal);

    if (!isCalled.current) {
      console.log(pageNumber)
      allPost(pageNumber, { signal })
        .then((data) => {
          data.map((item) => (item.openMoreText = false));
          setResults((prev) => [...prev, ...data]);
          setHasNextPage(Boolean(data.length));
          setIsLoading(false);
          isCalled.current = false;
        })
        // if abort controller called it does create an error, so we need to handle that here as well.
        .catch((err) => {
          setIsLoading(false);
          isCalled.current = false;
          // if (signal.aborted=true): it's created on purpose,so just need to ignore that.
          if (signal.aborted) return;

          // otherwise we will setIsError(true) & setError(detail).
          setIsError(true);
          setError({ message: err.message });
        });
    }

    isCalled.current = true;
    // anytime this unmounts it will abort the controller.
    return () => controller.abort();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};
export default usePosts;
