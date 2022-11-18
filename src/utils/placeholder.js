import { Skeleton } from "@mui/material";
export const loadingCss = {
  left: "50%",
  transform: "translateX(-50%)",
  marginTop: "20px",
};
export const realityPlaceholder = (
  <Skeleton variant="circular" width={60} height={60} />
);
export const suggestSidePlaceholder = (
  <div className="suggestUser-list-item-detail">
    <div className="suggestUser-list-item-pic">
      <Skeleton variant="circular" width={40} height={40} />
    </div>
    <div className="suggestUser-list-item-account">
      <Skeleton variant="text" width={100} sx={{ fontSize: "2rem" }} />
    </div>
  </div>
);

export const postPlaceholder = (
  <>
    <div className="post-header">
      <div className="post-user">
        <div className="post-user-pic">
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <Skeleton variant="text" width={100} sx={{ fontSize: "2rem" }} />
      </div>
    </div>
    <div className="post-pic">
      <Skeleton variant="rounded" height={537.26} />
    </div>
    <div className="post-main">
      <ul className="post-icons">
        <li>
          <Skeleton variant="circular" width={40} height={40} />
        </li>
      </ul>
      <Skeleton variant="text" width={100} sx={{ fontSize: "2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
    </div>
    <div className="post-footer" style={{ padding: "0 10px 10px" }}>
      <Skeleton variant="rounded" height={80} />
    </div>
  </>
);

export const postModalImagePlaceholder = (
  <Skeleton variant="rounded" height={80} />
);

export const postModalPCSizeHeaderPlaceholder = (
  <div className="post-detail">
    <div className="post-detail-header">
      <div className="user-detail">
        <div className="user-pic">
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div className="user-account fwb">
          <Skeleton variant="text" width={100} sx={{ fontSize: "2rem" }} />
        </div>
      </div>
    </div>
    <div className="post-detail-main">
      <ul className="post-msg">
        <li className="owner">
          <div className="post-msg-content">
            <div className="user-detail">
              <div className="user-pic">
                <Skeleton variant="rounded" height={537.26} />
              </div>
            </div>
            <div className="text" style={{width:'100%'}}>
              <Skeleton variant="rounded"  height={40} />
            </div>
          </div>
        </li>
        <li className="user">
          <div className="post-msg-content">
          <div className="user-detail">
              <div className="user-pic">
                <Skeleton variant="rounded" height={537.26} />
              </div>
            </div>
            <div className="text" style={{width:'100%'}}>
              <Skeleton variant="rounded"  height={40} />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
);
