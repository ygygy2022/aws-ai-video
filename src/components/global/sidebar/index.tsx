'use client';
import React from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { useUserQueryData } from '@/hooks/userQueryData';
import { getWorkSpaces } from '@/actions/workspace';
import { WorkspaceProps } from '@/types/index.type';
import Modal from '../modal';
import { Span } from 'next/dist/trace';
import { PlusCircle, PlusIcon } from 'lucide-react';
type Props = {
  activeWorkspaceId: string;
};

export const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const { data, isFetching } = useUserQueryData(
    ['user-workspaces'],
    getWorkSpaces
  );
  const { data: workspace } = data as WorkspaceProps;
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/next.svg" alt="Opal" width={40} height={40} />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={(value) => {
          onChangeActiveWorkspace(value);
        }}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"> </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map((workspace) => (
                <SelectItem
                  key={workspace.WorkSpace.id}
                  value={workspace.WorkSpace.id}
                >
                  {workspace.WorkSpace.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal
        trigger={
          <span className="text-sm cursor-pointer flex items-center justify-center bg-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
            <PlusCircle
              size={15}
              className="text-neutral-800/90 fill-neutral-500"
            />
            <span className="text-neutral-400 font-semibold text-sx">
              Invite to Workspace
            </span>
          </span>
        }
        title="Invite to Workspace"
        description="Invite a user to your workspace"
        WorkspaceSearch
      ></Modal>
    </div>
  );
};
