'use server';
import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const verifyAccessToWorkspace = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const isUserInWorkspace = await client.workspace.findUnique({
      where: {
        id: workSpaceId,
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

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: { workSpaceId },
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

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const videos = await client.video.findMany({
      where: {
        OR: [
          { workSpaceId },
          {
            folderId: workSpaceId,
          },
        ],
        select: {
          id: true,
          title: true,
          createdAt: true,
          source: true,
          processing: true,
          Folder: {
            select: {
              id: true,
              name: true,
            },
          },
          User: {
            select: {
              lastName: true,
              firstName: true,
              clerkid: true,
            },
          },
        },
      },
    });
    if (videos && videos.length > 0) return { status: 200, data: videos };
    return { status: 404 };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 400 };
  }
};

export const getWorkSpace = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const workSpace = await client.WorkSpace.findMany({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workSpace && workSpace.length > 0)
      return { status: 200, data: workSpace };
    return { status: 404 };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 400 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const notifications = await client.notification.findMany({
      where: {
        clerkid: user.id,
      },
    });
    if (notifications && notifications.length > 0)
      return { status: 200, data: notifications };
    return { status: 404 };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 400 };
  }
};
