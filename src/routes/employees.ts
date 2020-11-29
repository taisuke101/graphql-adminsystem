import express from 'express';

import {
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
} from '../controllers/employees';

const router = express.Router();

router.post('/employees', createEmployee);

router.get('/employees', getEmployees);

router.get('/employees/:uuid', getEmployee);

router.put('/employees/:uuid', updateEmployee);

router.delete('/employees/:uuid', deleteEmployee);

export default router;
