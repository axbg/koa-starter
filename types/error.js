const KoaError = class KoaError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, KoaError);
  }
};

const throwError = (message, code) => {
  throw new KoaError(message, code);
};

module.exports = {
  KoaError,
  throwError,
};
