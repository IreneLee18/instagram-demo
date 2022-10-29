import { allPost, allUser } from "../../utils/API";
import { useEffect, useRef, useState } from "react";
function Home() {
  const [allUserList, setAllUserList] = useState([]);
  const [allPostList, setAllPostList] = useState([]);
  useEffect(() => {
    allUser().then((res) => setAllUserList(res.data));
    allPost(10).then((res) => {
      setAllPostList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="home">
        <div className="home-listGroup">
          <div className="home-list">
            <ul className="home-list-reality">
              {allUserList.length !== 0 &&
                allUserList.map((item) => (
                  <li className="reality" key={item.id}>
                    <div className="reality-pic-outside">
                      <div className="reality-pic" id={item.id}>
                        <img
                          src={item.picture}
                          alt={item.firstName}
                          id={item.id}
                        />
                      </div>
                    </div>
                    <div className="reality-title" id={item.id}>
                      <h5 id={item.id}>{item.firstName}</h5>
                    </div>
                  </li>
                ))}
            </ul>
            <ul className="home-list-postList">
              {allPostList.length !== 0 &&
                allPostList.map((item) => (
                  <li className="post" key={item.id}>
                    <div className="post-header">
                      <div className="post-user">
                        <div className="post-user-pic">
                          <img src={item.owner.picture} alt={item.id} />
                        </div>
                        <h2 id={item.owner.id}>
                          {item.owner.firstName.toLowerCase()}_
                          {item.owner.lastName.toLowerCase()}
                        </h2>
                      </div>
                      <button className="material-symbols-outlined">
                        more_horiz
                      </button>
                    </div>
                    <div className="post-pic">
                      <img src={item.image} alt={item.id} />
                    </div>
                    <div className="post-main">
                      <ul className="post-icons">
                        <li className="post-icons-left">
                          <button className="material-symbols-outlined">
                            favorite
                          </button>
                          <button className="material-symbols-outlined">
                            maps_ugc
                          </button>

                          <button className="material-symbols-outlined">
                            near_me
                          </button>
                        </li>
                        <li className="post-icons-center"></li>
                        <li className="post-icons-right">
                          <button className="material-symbols-outlined">
                            bookmark
                          </button>
                        </li>
                      </ul>
                      <div className="post-likeCount">{item.likes} 個讚</div>
                      <div className="post-text">
                        <h2 id={item.owner.id}>
                          {item.owner.firstName.toLowerCase()}_
                          {item.owner.lastName.toLowerCase()}
                        </h2>
                        <p>{item.text}</p>
                        <p>
                          {item.tags.map((tag) => (
                            <button
                              className="tag"
                              key={tag.replace(" ", "")}
                              id={tag.replace(' ','')}
                            >
                              #{tag.replace(" ", "")}
                            </button>
                          ))}
                        </p>
                      </div>
                      <div className="post-message"></div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="home-side"></div>
      </div>
    </>
  );
}

export default Home;
