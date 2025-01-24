import { Request, Response } from 'express';
import { connection } from '../services/db';
import { z } from 'zod';

// Define validation schemas
const ItemSchema = z.object({
  name: z.string().min(1).max(100, 'Name must be between 1 and 100 characters'),
  description: z.string().max(500).optional(),
  price: z.number().positive('Price must be a positive number'),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
});

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input data
    const validatedData = ItemSchema.parse(req.body);
    const { name, description, price } = validatedData;
    const query = 'INSERT INTO items (name, description, price) VALUES (?, ?, ?)';

    // Execute query
    const [result] = await connection.execute(query, [name, description, price]);
    const insertId = (result as any).insertId;
    if (!insertId) {
      res.status(500).json({ message: 'Error retrieving insertId' });
      return;
    }

    // Respond with created item
    res.status(201).json({ id: insertId, name, description, price });
  } catch (err) {
    // Handle validation error
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation Error', errors: err.errors });
      return;
    }

    // Handle other errors
    res.status(500).json({ message: 'Error creating item', error: err });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const query = 'SELECT * FROM items';
  try {
    const [results] = await connection.execute(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const query = 'SELECT * FROM items WHERE id = ?';
    const [results] = await connection.execute(query, [id]);
    if ((results as any[]).length === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(200).json((results as any[])[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({ message: 'Validation Error', errors: err.errors });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'Error fetching item', error: err });
    }
  }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const { name, description, price } = ItemSchema.parse(req.body);
    const query = 'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?';
    const [results] = await connection.execute(query, [name, description, price, id]);
    if ((results as any).affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({ message: 'Validation Error', errors: err.errors });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'Error updating item', error: err });
    }
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const query = 'DELETE FROM items WHERE id = ?';
    const [results] = await connection.execute(query, [id]);
    if ((results as any).affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({ message: 'Validation Error', errors: err.errors });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'Error deleting item', error: err });
    }
  }
};
