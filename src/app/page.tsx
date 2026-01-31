import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');  // Always go to login first
}

