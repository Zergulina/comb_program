import { BrowserRouter, Route, Routes } from "react-router-dom";
import FileSelection from "./components/pages/FileSelection/FileSelection";
import OutletPanels from "./modules/OutletPanels/OutletPanels";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [appTheme, useAppTheme] = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels />}>
          <Route index element={<FileSelection />} />
        </Route>
        <Route path="/import" element={<OutletPanels />}>
          <Route index element={<FileSelection />} />
        </Route>
        <Route path="/export" element={<OutletPanels />}>
          <Route index element={<FileSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
