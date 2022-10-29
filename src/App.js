import LayoutSide from "./page/LayoutSide/LayoutSide";
import Home from "./page/Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<LayoutSide />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
