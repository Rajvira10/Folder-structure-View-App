import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import your main page component

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-500 p-4">
          <h1 className="text-2xl text-white font-semibold">
            Folder Structure Viewer
          </h1>
        </header>
        <main className="p-4">
          <Routes>
            {/* Define routes for your application */}
            <Route path="/" element={<Home />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
