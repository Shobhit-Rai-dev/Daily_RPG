// Catches anything thrown/passed to next() from controllers and turns it
// into the { message } shape the frontend's api.js already expects.
function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "That email is already registered" });
  }

  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Something went wrong on the server" });
}

module.exports = { notFound, errorHandler };
