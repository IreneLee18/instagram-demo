import { useState,  useImperativeHandle, forwardRef } from "react";
function PostMore(pops, ref) {
  const [modalState, setModalState] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
  }));

  if (!modalState) return null;

  return (
    <>
      <div className="modal postMore">
        <div className="modal-close" onClick={() => setModalState(false)}></div>
        <div className="modal-content">
          <ul className="modal-body postMore-body">
            <li>
              <button className="red-color fwb">檢舉</button>
            </li>
            <li>
              <button className="red-color fwb">取消追蹤</button>
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
