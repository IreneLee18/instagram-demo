import LayoutSide from "./page/LayoutSide/LayoutSide";
import Home from "./page/Home/Home";
import { Routes, Route } from "react-router-dom";
import UserPage from "./page/UserPage/UserPage";
function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<LayoutSide />}>
            <Route index element={<Home />} />
            <Route path=":ID" element={<UserPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
