import { Err, Ok, Result } from '@/interface/result';
import { TypeSafeError } from '@/interface/typeSafeError';
import { firebaseApp } from '../config';
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export async function signIn(
  email: string,
  password: string,
): Promise<Result<UserCredential, Error>> {
  try {
    const auth = getAuth(firebaseApp);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return new Ok(result);
  } catch (err) {
    return new Err(new TypeSafeError(err));
  }
}
