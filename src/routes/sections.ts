import express from 'express';

import { 
    createSection,
    updateSection,
    deleteSection
} from '../controllers/sections';

const router = express.Router();

router.post('/sections/:uuid', createSection);

router.put('/sections/:sectionCode', updateSection);

router.delete('/sections/:sectionCode', deleteSection);

export default router;
