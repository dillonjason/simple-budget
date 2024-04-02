import { Result } from '@/interface/result';
import React from 'react';

export function useAsync<T, E>(
  fn: (...args: unknown[]) => Promise<Result<T, E>>,
) {
  const [result, setResult] = React.useState<Result<T, E> | undefined>(
    undefined,
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const callFn = async () => {
      const result = await fn();
      setLoading(false);
      setResult(result);
    };

    callFn();
  }, [fn]);

  return {
    result,
    loading,
  };
}
