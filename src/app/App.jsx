import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayerSelection from "../pages/LayerSelection/LayerSelection";
import OutletPanels from "../modules/OutletPanels/OutletPanels";
import LayerElement from "../pages/LayerElement/LayerElement";
import { LayerElementNav } from "../modules/LayerElementNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels />}>
          <Route index element={<LayerSelection />} />
          <Route path="element" element={<LayerElementNav />}>
            <Route index element={<Navigate replace to="output" />} />
            <Route path="output" element={<LayerElement />} />
            <Route path="table" element={<LayerElement/>}/>
            <Route path="parameters" element={<LayerElement/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
