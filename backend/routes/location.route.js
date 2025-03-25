import { Router } from 'express';
import { createLocation, deleteLocation, getLocations, updateLocation } from '../controllers/location.controller';

const router = Router();

router.route('/locations')
.post(createLocation);

router.route('/locations/:id')
.get(getLocations)
.patch(updateLocation)
.delete(deleteLocation);

export default router;