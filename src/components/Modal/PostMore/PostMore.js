import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
function PostMore(pops, ref) {
  const [modalState, setModalState] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
  }));
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [modalState]);

  if (!modalState) return null;

  return (
    <>
      <div
        className="modal"
        onClick={() => setModalState(false)}
      >
        <div className="modal-content">
          <ul className="modal-body">
            <li>
              <button>檢舉</button>
            </li>
            <li>
              <button>取消追蹤</button>
            </li>
            <li>
              <button>加到「最愛」</button>
            </li>
            <li>
              <button>前往貼文</button>
            </li>
            <li>
              <button>分享到......</button>
            </li>
            <li>
              <button>複製連結</button>
            </li>
            <li>
              <button>內嵌</button>
            </li>
            <li>
              <button onClick={() => setModalState(false)}>取消</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default forwardRef(PostMore);
