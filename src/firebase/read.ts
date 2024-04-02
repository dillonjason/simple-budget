import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { firebaseApp } from './config';
import { Err, Ok, Result } from '@/interface/result';
import { TypeSafeError } from '@/interface/typeSafeError';

const db = getFirestore(firebaseApp);

export async function read<AppModelType, DbModelType extends DocumentData>(
  path: string,
  id: string,
): Promise<Result<DocumentSnapshot<AppModelType, DbModelType>, Error>> {
  try {
    const docRef = doc(db, path, id) as DocumentReference<
      AppModelType,
      DbModelType
    >;
    const result = await getDoc<AppModelType, DbModelType>(docRef);
    return new Ok(result);
  } catch (e) {
    return new Err(new TypeSafeError(e));
  }
}
