import React, { useEffect, useState } from 'react';

export default function useUser() {
  const [user, set_user] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('userId')) {
      set_user(Number(sessionStorage.getItem('userId') as string));
    }
  }, []);

  return user;
}
