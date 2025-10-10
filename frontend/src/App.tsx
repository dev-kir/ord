import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import WordCountPage from "./pages/WordCountPage";
import SentimentPage from "./pages/SentimentPage";
import DashboardPage from "./pages/DashboardPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/count" element={<WordCountPage />} />
            <Route path="/sentiment" element={<SentimentPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
