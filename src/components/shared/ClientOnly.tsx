"use client";
import { useSyncExternalStore, ReactNode } from "react";

const emptySubscribe = () => () => {};
const returnTrue = () => true;
const returnFalse = () => false;

export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useSyncExternalStore(emptySubscribe, returnTrue, returnFalse);

  if (!mounted) return fallback;
  return <>{children}</>;
}
