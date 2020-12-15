import express from 'express';

import {
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../controllers/employees';

const router = express.Router();

router.post('/employees', createEmployee);

router.put('/employees/:employeeCode', updateEmployee);

router.delete('/employees/:employeeCode', deleteEmployee);

export default router;
