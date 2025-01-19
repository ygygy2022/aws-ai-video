import { onAuthenticationUser } from '@/actions/user';
import { verifyAccessToWorkspace } from '@/actions/workspace';
import { redirect } from 'next/navigation';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';
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
    queryFn: () => getAllUserWorkspaces(),
  });
  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
  });
  return <div>{children}</div>;
};

export default Layout;
