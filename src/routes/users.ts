import express from 'express';

import { 
    createUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser
} from '../controllers/users';

const router = express.Router();

// ユーザー作成
router.post('/users', createUser);

//ユーザー全件取得
router.get('/users', getUsers);

//ユーザー１件取得
router.get('/users/:uuid', getUser);

//ユーザー情報更新
router.put('/users/:uuid', updateUser);

//ユーザー削除
router.delete('/users/:uuid', deleteUser);

export default router;