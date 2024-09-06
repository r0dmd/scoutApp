import express from 'express';

import {
    newUserController,
    activateUserController,
    loginUserController,
    getPrivateUserInfoController,
} from '../controllers/users/index.js';

import authUserController from '../middlewares/authUserController.js';

const router = express.Router();

// Rutas de usuario (familia y ojeador)
router.post(`/users/register`, newUserController);
router.put(`/users/activate/:registrationCode`, activateUserController);
router.post(`/users/login`, loginUserController);

router.get(`/users/`, authUserController, getPrivateUserInfoController);

export default router;
