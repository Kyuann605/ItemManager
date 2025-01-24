import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id);
      fetchItems(); // Refresh list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleView = (id: number) => {
    navigate(`/item/${id}`); // Navigate to the Item Details Page
  };

  const handleUpdate = (id: number) => {
    // Logic for updating item details can be added here
    navigate(`/item/${id}/edit`); // Navigate to the Item Details Page
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Item Listings</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleView(item.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View
              </button>
              <button
                onClick={() => handleUpdate(item.id)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
