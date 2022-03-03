class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statuseCode = statusCode
  }
}

module.exports = ErrorResponse