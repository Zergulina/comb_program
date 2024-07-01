import { BrowserRouter, Route, Routes } from "react-router-dom";
import FileSelection from "../pages/FileSelection/FileSelection";
import OutletPanels from "../modules/OutletPanels/OutletPanels";
import { useTheme } from "../hooks/useTheme";

function App() {
  const [appTheme, useAppTheme] = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPanels  appTheme={appTheme} useAppTheme={useAppTheme}/>}>
          <Route index element={<FileSelection />} />
        </Route>
        <Route path="/import" element={<OutletPanels appTheme={appTheme} useAppTheme={useAppTheme}/>}>
          <Route index element={<FileSelection />} />
        </Route>
        <Route path="/export" element={<OutletPanels appTheme={appTheme} useAppTheme={useAppTheme}/>}>
          <Route index element={<FileSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
