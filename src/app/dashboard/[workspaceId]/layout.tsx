import { onAuthenticationUser } from '@/actions/user';
import { redirect } from 'next/navigation';
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

  return <div>{children}</div>;
};

export default Layout;
