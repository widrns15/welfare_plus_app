import { BrowserRouter, Routes, Route } from "react-router-dom";
//import MainPage from "./pages/MainPage";
//import SearchResultPage from "./pages/SearchResultPage";
//import ServiceDetailPage from "./pages/ServiceDetailPage";
//import FavoritePage from "./pages/FavoritePage";
//import SettingsPage from "./pages/SettingsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/results" element={<SearchResultPage />} />
                <Route path="/service/:id" element={<ServiceDetailPage />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
