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
      <div className="modal postMore">
        <div className="modal-close" onClick={() => setModalState(false)}></div>
        <div className="modal-content">
          <ul className="modal-body postMore-body">
            <li>
              <button className="red-color fwb">刪除</button>
            </li>
            <li>
              <button>編輯</button>
            </li>
            <li>
              <button>隱藏按讚數</button>
            </li>
            <li>
              <button>關閉留言功能</button>
            </li>
            <li>
              <button>前往貼文</button>
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
