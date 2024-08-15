import { BrowserRouter, Route, Routes } from "react-router-dom";
import FileSelection from "../pages/FileSelection/FileSelection";
import OutletPanels from "../modules/OutletPanels/OutletPanels";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels/>}>
          <Route index element={<FileSelection />} />
        </Route>
        <Route path="/graph" element={<OutletPanels/>}>
          <Route index element={<FileSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
