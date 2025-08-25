'use client';
import { Shell } from '@/components/Shell';

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
