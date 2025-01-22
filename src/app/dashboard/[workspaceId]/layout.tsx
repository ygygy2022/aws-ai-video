import { onAuthenticationUser } from '@/actions/user';
import { verifyAccessToWorkspace } from '@/actions/workspace';
import { redirect } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotifications } from '@/actions/user';
import { getWorkspaceFolders } from '@/actions/workspace';
import { getAllUserVideos } from '@/actions/workspace';
import { getWorkSpaces } from '@/actions/workspace';
import React from 'react';
import { Sidebar } from '@/components/global/sidebar';
type Props = {
  params: {
    workspaceId: string;
  };
  children: React.ReactNode;
};

const Layout = async ({ children, params: { workspaceId } }: Props) => {
  const auth = await onAuthenticationUser();
  if (!auth.user?.workspace) return redirect('/auth/sign-in');
  if (!auth.user?.workspace.length) return redirect('/auth/sign-in');
  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status != 200) return redirect('/auth/sign-in');
  if (!hasAccess.data?.workspace) return null;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar actionWorkspaceId={workspaceId} />
        {children}
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
