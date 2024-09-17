import express from 'express';

import {
    authUserController,
    userIsFamily,
    userIsScout,
} from '../middlewares/index.js';

import {
    addNewVideoController,
    //familyNegociationController,
    getPlayerInfoByIdController,
    newPlayerController,
    playerListController,
    //scoutContactController,
} from '../controllers/players/index.js';

const router = express.Router();

// Rutas de usuario (familia y ojeador)
router.get(`/players`, playerListController);
router.get(`/players/:playerId`, getPlayerInfoByIdController);

router.post(`/players`, authUserController, userIsFamily, newPlayerController);
router.post(
    `/players/:playerId/videos`,
    authUserController,
    userIsFamily,
    addNewVideoController,
);

router.post(
    `/players/:playerId/contact`,
    authUserController,
    userIsScout,
    // scoutContactController,
);
router.put(
    `/players/:playerId/contact/:contactId`,
    authUserController,
    userIsFamily,
    // familyNegociationController,
);

export default router;
