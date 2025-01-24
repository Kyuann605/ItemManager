import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import CreateItemPage from "./pages/CreateItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import UpdateDetailPage from "./pages/UpdateDetailPage";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-indigo-600 text-white p-4 shadow-lg">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Item Manager</h1>
            <div className="space-x-10">
              <Link
                to="/"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Create Item
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow bg-white p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateItemPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/item/:id/edit" element={<UpdateDetailPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; Item Manager by Goh Kai Yuan</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
