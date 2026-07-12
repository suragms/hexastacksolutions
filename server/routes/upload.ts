import express from 'express';
import multer from 'multer';
import { requireStaff } from '../utils/auth';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.post('/', requireStaff, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const mime = req.file.mimetype;
        const url = `data:${mime};base64,${b64}`;

        res.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

export default router;
