export class AccountDeletedError extends Error {
  constructor() {
    super('This account has been deleted');
    this.name = 'AccountDeletedError';
  }
}
