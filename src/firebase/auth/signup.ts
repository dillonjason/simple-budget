import { Ok, Err, Result } from '@/interface/result';
import { TypeSafeError } from '@/interface/typeSafeError';
import { firebaseApp } from '../config';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

export async function signup(
  email: string,
  password: string,
): Promise<Result<UserCredential, Error>> {
  try {
    const auth = getAuth(firebaseApp);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return new Ok(result);
  } catch (err) {
    return new Err(new TypeSafeError(err));
  }
}
