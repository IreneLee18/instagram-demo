import { useParams } from "react-router-dom";
import MyPage from "./MyPage/MyPage";
import OtherPage from "./OtherPage/OtherPage";
function UserPage() {
  const { ID } = useParams();
  return <>{ID === "mypage" ? <MyPage /> : <OtherPage />}</>;
}

export default UserPage;
