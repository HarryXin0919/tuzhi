import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";

export function useAnyLoaderData<T>(): T {
  return (useLoaderData as (opts: { strict: boolean }) => T)({ strict: false });
}

export function useAnySearch<T extends Record<string, unknown>>(): T {
  return (useSearch as (opts: { strict: boolean }) => T)({ strict: false });
}

export function useAnyNavigate() {
  return useNavigate() as (opts: {
    to?: string;
    search?: Record<string, unknown> | true | ((prev: Record<string, unknown>) => Record<string, unknown>);
    params?: Record<string, string>;
    replace?: boolean;
  }) => void;
}
