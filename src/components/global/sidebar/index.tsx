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
type Props = {
  actionWorkspaceId: string;
};

export const Sidebar = ({ actionWorkspaceId }: Props) => {
  const router = useRouter();
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
        defaultValue={actionWorkspaceId}
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
