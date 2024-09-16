'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    console.log(loggedInUserId);
    if (!loggedInUserId) {
      router.replace("/app/login");  // Redirect if not logged in
    } else {
      setIsLoading(false);  // Set loading to false once user is authenticated
    }
  }, [router]);

  // Show loading or nothing until the authentication check is complete
  if (isLoading) {
    return <div>Loading...</div>;  // Or just return null to render nothing
  }

  return (
    <p>Our app homepage</p>
  );
}

