import {
  useQuery,
  Enabled,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';

export const useUserQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isFetching, isPending, isFetched, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });
  return { data, isFetching, isPending, isFetched, refetch };
};
