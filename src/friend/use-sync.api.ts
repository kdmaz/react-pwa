import { useCallback } from "react";
import { PendingRequest } from "./friend.interface";
import { removePendingRequest } from "./pending-friend.storage";
import { useFriendApiAndStorage } from "./use-friend-api-and-storage";

interface SyncPendingRequestFunctions {
  syncPendingRequests: (pendingRequests: PendingRequest[]) => Promise<void>;
}

function useSyncPendingRequests(): SyncPendingRequestFunctions {
  const { addFriendAndSyncDb, updateFriendAndSyncDb, deleteFriendAndSyncDb } =
    useFriendApiAndStorage();

  const syncPendingRequests = useCallback(
    async (pendingRequests: PendingRequest[]) => {
      for (let pendingRequest of pendingRequests) {
        const friend = {
          id: pendingRequest.id,
          name: pendingRequest.name,
          age: pendingRequest.age,
        };

        if (pendingRequest.requestType === "post") {
          await addFriendAndSyncDb(friend);
        } else if (pendingRequest.requestType === "patch") {
          await updateFriendAndSyncDb(friend);
        } else if (pendingRequest.requestType === "delete") {
          await deleteFriendAndSyncDb(friend);
        }

        await removePendingRequest(pendingRequest.id);
      }
    },
    [addFriendAndSyncDb, deleteFriendAndSyncDb, updateFriendAndSyncDb]
  );

  return { syncPendingRequests };
}

export { useSyncPendingRequests };
