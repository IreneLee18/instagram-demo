import { Skeleton } from "@mui/material";
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
      <Skeleton variant="rectangular" height={537.26} />
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
      <Skeleton variant="rectangular" height={80} />
    </div>
  </>
);
