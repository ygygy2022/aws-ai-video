'use server';
import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

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
    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    return {
      status: 403,
      data: { workspace: null },
    };
  }
};
