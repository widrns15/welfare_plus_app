import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import FacilityDetailPage from "./pages/FacilityDetailPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/results" element={<SearchResultPage />} />
                    <Route
                        path="/facility/:id"
                        element={<FacilityDetailPage />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
