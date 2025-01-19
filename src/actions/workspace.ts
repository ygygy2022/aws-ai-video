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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      status: 403,
      data: { workspace: null },
    };
  }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: { workspaceId },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolders && isFolders.length > 0)
      return { status: 200, data: isFolders };
    return { status: 404, data: [] };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 403, data: [] };
  }
};
