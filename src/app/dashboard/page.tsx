'use client';

import { useAuthContext } from '@/context/AuthContext';
import { firebaseApp } from '@/firebase/config';
import { read } from '@/firebase/read';
import { write } from '@/firebase/write';
import { useAsync } from '@/hooks/useAsync';
import { Err, Ok, Result } from '@/interface/result';
import { Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type PushFn = (url: string) => void;

async function fetchData(
  userId: string | undefined,
  push: PushFn,
): Promise<Result<DocumentSnapshot<unknown, DocumentData>, null>> {
  if (userId === undefined) {
    push('/login');
    return new Err(null);
  }

  try {
    const wResult = await write('user', userId, { name: 'tester', age: 12 });
    if (wResult.isOk()) console.log('write complete');
    else console.log(wResult.error.message);

    const result = await read('user', userId);
    if (result.isOk()) {
      return new Ok(result.value);
    } else {
      await logout(push);
      return new Err(null);
    }
  } catch (e) {
    await logout(push);
    return new Err(null);
  }
}

async function logout(push: PushFn) {
  const auth = getAuth(firebaseApp);
  await auth.signOut();
  push('/login');
}

export default function Dashboard() {
  const { push } = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    logout(push);
  }

  return (
    <main>
      <h1>Logged in!</h1>
      <Button onClick={() => logout(push)}>Logout</Button>
    </main>
  );
}
