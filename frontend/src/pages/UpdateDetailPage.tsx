import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, updateItem } from "../services/api";

const UpdateDetailPage: React.FC = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState<any>({
    name: "",
    description: "",
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the item details based on the ID
  const fetchItemDetails = async () => {
    try {
      const response = await getItemById(Number(id));
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  // Handle cancel action (redirect to home)
  const handleCancel = () => {
    navigate("/"); // Redirect back to the homepage without making changes
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure that price is a number
    const updatedItem = { ...item, price: Number(item.price) };

    try {
      await updateItem(Number(id), updatedItem); // Use updatedItem here
      navigate("/"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Fetch item details when the component mounts
  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Item</h1>
      <form
        onSubmit={handleSubmit} // Handle form submission here
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={item.price}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit" // Submitting the form here
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDetailPage;
