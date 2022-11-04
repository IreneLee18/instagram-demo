// import { deleteUsePostID } from "../../../utils/API";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
function PostMoreComment({ handleClickDeleteComment }, ref) {
  const [modalState, setModalState] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
    closeModal: () => setModalState(false),
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
              <button className="red-color fwb">檢舉</button>
            </li>
            <li>
              <button
                className="red-color fwb"
                onClick={handleClickDeleteComment}
              >
                刪除
              </button>
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

export default forwardRef(PostMoreComment);
