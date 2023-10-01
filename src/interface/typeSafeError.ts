export class TypeSafeError extends Error {
  constructor(err: unknown) {
    if (err instanceof Error) {
      super(err.message, { cause: err.cause });
      this.name = err.name;
      this.stack = err.stack;
    } else {
      super('Unknown error');
    }
  }
}
