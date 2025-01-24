import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../services/api"; // Assuming you have a service to fetch item by id

const ItemDetailPage: React.FC = () => {
  const { id } = useParams(); // Get item id from the URL
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await getItemById(Number(id)); // Fetch item by id
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Item Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Name:</h2>
        <p className="text-gray-900">{item.name}</p>
        <br></br>
        <h2 className="text-xl font-semibold">Description:</h2>
        <p className="text-gray-900">{item.description}</p>
        <br></br>
        <h2 className="text-xl font-semibold">Price:</h2>
        <p className="text-gray-900">${item.price}</p>
      </div>
    </div>
  );
};

export default ItemDetailPage;
