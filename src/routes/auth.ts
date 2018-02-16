import { Router } from 'express';
import * as passport from "passport";

const router = Router();

/**
 * OAuth authentication routes.
 */
router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
  res.redirect(req.session.returnTo || "/");
});

export default router;