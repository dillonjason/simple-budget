import {
  getFirestore,
  setDoc,
  doc,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore';
import { firebaseApp } from './config';
import { Err, Ok, Result } from '@/interface/result';
import { TypeSafeError } from '@/interface/typeSafeError';

const db = getFirestore(firebaseApp);

export async function write(
  path: string,
  id: string,
  data: WithFieldValue<DocumentData>,
): Promise<Result<void, Error>> {
  try {
    await setDoc(doc(db, path, id), data, {
      merge: true,
    });
    return new Ok(undefined);
  } catch (err) {
    return new Err(new TypeSafeError(err));
  }
}
