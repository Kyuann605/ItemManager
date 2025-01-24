import React, { useState } from "react";
import { createItem } from "../services/api";

const CreateItemPage: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem({ name, description, price: parseFloat(price) });
      alert("Item created successfully");
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Item</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description:
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price:
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItemPage;
