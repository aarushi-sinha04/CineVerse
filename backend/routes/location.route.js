import { Router } from "express";
import { createLocation, deleteLocation, getLocations, updateLocation } from "../controllers/location.controller.js";

const router = Router();

// Corrected routes (no `/locations` prefix here)
router.route("/")
    .get(getLocations)
    .post(createLocation);

router.route("/:id")
    .get(getLocations)
    .patch(updateLocation)
    .delete(deleteLocation);

export default router;
