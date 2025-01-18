'use server';
import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403, message: 'User not found' };

    const isUserInWorkspace = await client.workspace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          { User: { clerkid: user.id } },
          {
            members: {
              some: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return { status: 200, workspace: isUserInWorkspace };
  } catch (error) {
    return {
      status: 403,
      workspace: null,
    };
  }
};
