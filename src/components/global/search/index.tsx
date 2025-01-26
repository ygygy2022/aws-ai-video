import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import React from 'react';

type Props = {
  workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
  const { onSearchQuery, query, isFetching, onUsers } = useSearch(
    'get-workspace',
    'USERS'
  );
  // const { mutate, isPending } = useMutationData('get-workspace', () => {});
  return (
    <div className="flex flex-col gap-y-5">
      <Input
        value={query}
        onChange={onSearchQuery}
        className="bg-transparent border-2 outline-none"
        placeholder="Search for your workforce..."
        type="text"
      />
    </div>
  );
};

export default Search;
