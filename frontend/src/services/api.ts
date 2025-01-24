import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getItems = () => api.get('/item');
export const getItemById = (id: number) => api.get(`/item/${id}`);
export const createItem = (data: { name: string; description?: string; price: number }) =>
  api.post('/item', data);
export const updateItem = (id: number, data: { name: string; description?: string; price: number }) =>
  api.put(`/item/${id}`, data);
export const deleteItem = (id: number) => api.delete(`/item/${id}`);