'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 text-center">
      <CheckCircle className="w-16 h-16 text-accent" />
      <h1 className="text-3xl font-bold mt-4">Reservation Confirmed!</h1>
      <p className="mt-2 text-lg max-w-md text-muted-foreground">
        Your workshop reservation has been successfully booked. Keep an eye on your email for further communication and details.
      </p>
      <Button
        className="mt-6 px-6 py-3 text-lg bg-accent text-accent-foreground hover:bg-secondary"
        onClick={() => router.push('/blogs')}
      >
        Go to Blog
      </Button>
    </div>
  );
}
