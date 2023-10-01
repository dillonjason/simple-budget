interface ResultBase<T, E> {
  isOk: () => this is Ok<T, E>;

  isErr: () => this is Err<T, E>;

  ok: () => T | null;

  err: () => E | null;
}

export class Ok<T, E> implements ResultBase<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return !this.isOk();
  }

  ok() {
    return this.value;
  }

  err() {
    return null;
  }
}

export class Err<T, E> implements ResultBase<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return !this.isOk();
  }

  ok() {
    return null;
  }

  err() {
    return this.error;
  }
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;
