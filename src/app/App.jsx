import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayerSelection from "../pages/LayerSelection/LayerSelection";
import OutletPanels from "../modules/OutletPanels/OutletPanels";
import LayerElement from "../pages/LayerElement/LayerElement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels/>}>
          <Route index element={<LayerSelection />} />
        </Route>
        <Route path="/element" element={<OutletPanels/>}>
          <Route index element={<LayerElement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
