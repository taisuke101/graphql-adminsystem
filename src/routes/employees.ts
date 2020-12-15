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

router.get('/employees/:employeeCode', getEmployee);

router.put('/employees/:employeeCode', updateEmployee);

router.delete('/employees/:employeeCode', deleteEmployee);

export default router;
