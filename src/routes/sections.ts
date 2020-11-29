import express from 'express';

import { 
    createSection,
    getSections,
    getSection,
    updateSection,
    deleteSection
} from '../controllers/sections';

const router = express.Router();

router.post('/sections', createSection);

router.get('/sections', getSections);

router.get('/sections', getSection);

router.put('/sections', updateSection);

router.delete('/sections', deleteSection);

export default router;
