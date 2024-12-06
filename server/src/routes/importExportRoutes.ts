import express from 'express';
import multer from 'multer';
import { importQuotes, exportQuotes } from '../controllers/importExportController';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), importQuotes);

router.get('/export', exportQuotes);

export default router;