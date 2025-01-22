import React from 'react';
import { redirect } from 'next/navigation';
import { onAuthenticationUser } from '@/actions/user';
import WorkspacePage from './[workspaceId]/page';

type Props = {};

const DashboardPage = async (props: Props) => {
  const auth = await onAuthenticationUser();
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in');
  }
};

export default DashboardPage;
