import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import FacilityDetailPage from "./pages/FacilityDetailPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/results" element={<SearchResultPage />} />
                <Route path="/facility/:id" element={<FacilityDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
