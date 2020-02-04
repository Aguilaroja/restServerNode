class DomainError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
  }
}

class AuthenticationError extends Error {
  constructor(resource, query) {
    super(`Unauthorized client. Unknown credentials.`);
    this.name = this.constructor.name;
  }
}

module.exports = {
  AuthenticationError
};
