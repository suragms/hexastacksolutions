import express from 'express';
import { getCollection, ObjectId } from '../mongodb';

const router = express.Router();

const mapId = (doc: any) => {
    if (!doc) return doc;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
};

// GET all products
router.get('/', async (_req, res) => {
    try {
        const collection = await getCollection('Product');
        const products = await collection.find({}).sort({ displayOrder: 1 }).toArray();
        res.json(products.map(mapId));
    } catch (error: any) {
        console.error('Failed to fetch products:', error?.message || error);
        const msg = error?.message?.includes('DATABASE_URL') ? error.message : 'Failed to fetch products';
        res.status(error?.message?.includes('DATABASE_URL') ? 503 : 500).json({ error: msg });
    }
});

// POST new product
router.post('/', async (req, res) => {
    try {
        const collection = await getCollection('Product');
        const { name, link, description, features, category, isComingSoon, displayOrder } = req.body;

        const newProduct = {
            name,
            link: link || null,
            description: description || '',
            features: Array.isArray(features) ? features : [],
            category: category === 'business' || category === 'free' ? category : null,
            isComingSoon: !!isComingSoon,
            displayOrder: parseInt(displayOrder) || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await collection.insertOne(newProduct);
        res.status(201).json({ id: result.insertedId.toString(), ...newProduct });
    } catch (error) {
        console.error('Failed to create product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT update product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection('Product');
        const { name, link, description, features, category, isComingSoon, displayOrder } = req.body;

        const updateData = {
            name,
            link: link || null,
            description: description || '',
            features: Array.isArray(features) ? features : [],
            category: category === 'business' || category === 'free' ? category : null,
            isComingSoon: !!isComingSoon,
            displayOrder: parseInt(displayOrder) || 0,
            updatedAt: new Date()
        };

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        res.json({ id, ...updateData });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection('Product');
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// PATCH reorder products
router.patch('/reorder', async (req, res) => {
    try {
        const { orders } = req.body;
        const collection = await getCollection('Product');

        for (const item of orders) {
            await collection.updateOne(
                { _id: new ObjectId(item.id) },
                { $set: { displayOrder: item.displayOrder } }
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to reorder products:', error);
        res.status(500).json({ error: 'Failed to reorder products' });
    }
});

export default router;
