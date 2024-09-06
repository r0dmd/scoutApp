import express from 'express';

import {
    addNewVideoController,
    familyNegociationController,
    getPlayerInfoByIdController,
    newPlayerController,
    playerListController,
    scoutContactController,
} from '../controllers/players/index.js';

const router = express.Router();

// Rutas de usuario (familia y ojeador)
router.get(`/players`, playerListController);
router.get(`/players/:playerId`, getPlayerInfoByIdController);

router.post(`/players`, newPlayerController);
router.post(`/players/:playerId/videos`, addNewVideoController);

router.post(`/players/:playerId/contact`, scoutContactController);
router.put(
    `/players/:playerId/contact/:contactId`,
    familyNegociationController,
);

export default router;
