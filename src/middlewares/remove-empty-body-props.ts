/**
 * Middleware that removes any empty strings
 * in the request.body to prevent updating
 * documents with empty values
 */

const removeEmptyBodyProps = obj => {
  for (const k in obj) {
    if (obj[k].trim() === "") delete obj[k];
  }
  return obj;
};

const middleware = (req, res, next) => {
  removeEmptyBodyProps(req.body);
  next();
};

export default middleware;