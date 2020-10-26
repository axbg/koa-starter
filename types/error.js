const KoaError = class KoaError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, KoaError);
  }
};

module.exports = KoaError;
