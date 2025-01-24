import { Router } from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/item.controller';

const router: Router = Router();

// POST /api/item - Create a new item
router.post('/', createItem);

// GET /api/item - Get all items
router.get('/', getItems);

// GET /api/item/:id - Get an item by ID
router.get('/:id', getItemById);

// PUT /api/item/:id - Update an item by ID
router.put('/:id', updateItem);

// DELETE /api/item/:id - Delete an item by ID
router.delete('/:id', deleteItem);

export default router;