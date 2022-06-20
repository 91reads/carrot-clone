import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function useUser() {
  const { data, error } = useSWR('/api/users/me');
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    if(!data?.profile && !data?.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return {user: data?.profile, isLoading: !data && !error};
}