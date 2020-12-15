import express from 'express';

import { 
    createSection,
    getSections,
    getSection,
    updateSection,
    deleteSection
} from '../controllers/sections';

const router = express.Router();

router.post('/sections/:uuid', createSection);

router.get('/sections', getSections);

router.get('/sections', getSection);

router.put('/sections/:sectionCode', updateSection);

router.delete('/sections/:sectionCode', deleteSection);

export default router;
