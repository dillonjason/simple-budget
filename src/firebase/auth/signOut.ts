import { Err, Ok, Result } from '@/interface/result';
import { TypeSafeError } from '@/interface/typeSafeError';
import { firebaseApp } from '../config';
import { getAuth } from 'firebase/auth';

export async function signOut(): Promise<Result<void, Error>> {
  try {
    const auth = getAuth(firebaseApp);
    await auth.signOut();
    return new Ok(undefined);
  } catch (err) {
    return new Err(new TypeSafeError(err));
  }
}
