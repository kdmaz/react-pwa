import { useCallback } from "react";
import { useOnlineStatus } from "../useOnlineStatus";
import {
  addFriend,
  deleteFriend,
  getFriends,
  updateFriend,
} from "./friend.api";
import { Friend } from "./friend.interface";
import {
  addFriendToDb,
  deleteFriendToDb,
  getFriendsToDb,
  updateFriendToDb,
} from "./friend.storage";
import {
  addFriendToPending,
  deleteFriendToPending,
  updateFriendToPending,
} from "./pending-friend.storage";

interface FriendApiAndStorageFunctions {
  getFriendsAndSyncDb: () => Promise<void>;
  addFriendAndSyncDb: (friend: Friend) => Promise<void>;
  updateFriendAndSyncDb: (friend: Friend) => Promise<void>;
  deleteFriendAndSyncDb: (friend: Friend) => Promise<void>;
}

function useFriendApiAndStorage(): FriendApiAndStorageFunctions {
  const onlineStatus = useOnlineStatus();

  const getFriendsAndSyncDb = useCallback(async () => {
    if (onlineStatus) {
      const friends = await getFriends();
      await getFriendsToDb(friends);
    }
  }, [onlineStatus]);

  const addFriendAndSyncDb = useCallback(
    async (friend: Friend) => {
      if (onlineStatus) {
        const newFriend = await addFriend(friend);
        await addFriendToDb(newFriend);
      } else {
        await addFriendToPending(friend);
      }
    },
    [onlineStatus]
  );

  const updateFriendAndSyncDb = useCallback(
    async (friend: Friend) => {
      if (onlineStatus) {
        const updatedFriend = await updateFriend(friend);
        await updateFriendToDb(updatedFriend);
      } else {
        await updateFriendToPending(friend);
      }
    },
    [onlineStatus]
  );

  const deleteFriendAndSyncDb = useCallback(
    async (friend: Friend) => {
      if (onlineStatus) {
        const id = await deleteFriend(friend.id);
        await deleteFriendToDb(id);
      } else {
        await deleteFriendToPending(friend);
      }
    },
    [onlineStatus]
  );

  return {
    getFriendsAndSyncDb,
    addFriendAndSyncDb,
    updateFriendAndSyncDb,
    deleteFriendAndSyncDb,
  };
}

export { useFriendApiAndStorage };
