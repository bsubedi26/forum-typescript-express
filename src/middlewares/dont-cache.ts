/**
 * DO NOT cache routes that require authentication
 * to prevent back button reload from cache
 */
const dontCache = (req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
};

export default dontCache;