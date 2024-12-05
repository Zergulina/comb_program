import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayerSelection from "../pages/LayerSelection/LayerSelection";
import OutletPanels from "../modules/OutletPanels/OutletPanels";
import { LayerElementNav } from "../modules/LayerElementNav";
import ElementTablePage from "../pages/ElementTablePage/ElementTablePage";
import ElementOutputPage from "../pages/ElementOutput/ElementOutputPage";
import ElementInputParameters from "../pages/ElementInputParameters/ElementInputParameters";
import ElementOutputParameters from "../pages/ElementOutputParameters/ElementOutputParameters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels />}>
          <Route index element={<LayerSelection />} />
          <Route path="element" element={<LayerElementNav />}>
            <Route index element={<Navigate replace to="output" />} />
            <Route path="output" element={<ElementOutputPage />} />
            <Route path="table" element={<ElementTablePage/>}/>
            <Route path="input-parameters" element={<ElementInputParameters/>}/>
            <Route path="output-parameters" element={<ElementOutputParameters/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
