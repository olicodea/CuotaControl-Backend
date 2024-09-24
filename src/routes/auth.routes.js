import { Router } from "express";
import passport from "./auth.js";

const router = Router();

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const { token, user } = req.user;
        res.json({ token, user });
    }
);

export default router;
