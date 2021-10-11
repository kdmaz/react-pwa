import { useLiveQuery } from "dexie-react-hooks";
import { validate } from "uuid";
import { friendsTable, pendingFriendsTable } from "../db";
import { Friend, PendingFriend } from "./friend.interface";

function useFriendList(): (Friend | PendingFriend)[] {
  const friends = useLiveQuery(() => friendsTable.toArray(), []);
  const pendingFriends = useLiveQuery(() => pendingFriendsTable.toArray(), []);

  const newPendingFriends: PendingFriend[] = [];
  const pendingFriendsMap: Record<string, PendingFriend> = {};

  for (let pendingFriend of pendingFriends ?? []) {
    if (validate(pendingFriend.id)) {
      newPendingFriends.push(pendingFriend);
    } else {
      pendingFriendsMap[pendingFriend.id] = pendingFriend;
    }
  }

  const displayFriends: (Friend | PendingFriend)[] = [...newPendingFriends];

  for (let friend of friends ?? []) {
    const pendingChange = pendingFriendsMap[friend.id];

    if (!pendingChange) {
      displayFriends.push(friend);
      continue;
    }

    if (pendingChange.requestType === "delete") {
      continue;
    }

    if (
      pendingChange.requestType === "patch" ||
      pendingChange.requestType === "post"
    ) {
      displayFriends.push(pendingChange);
      continue;
    }
  }

  return displayFriends;
}

export { useFriendList };
