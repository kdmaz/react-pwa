import { useLiveQuery } from "dexie-react-hooks";
import { validate } from "uuid";
import { friendsTable, pendingRequestsTable } from "../db";
import { Friend, PendingRequest } from "./friend.interface";

function useFriendList(): (Friend | PendingRequest)[] {
  const friends = useLiveQuery(() => friendsTable.toArray(), []);
  const pendingRequests = useLiveQuery(
    () => pendingRequestsTable.toArray(),
    []
  );

  const newPendingRequests: PendingRequest[] = [];
  const pendingRequestsMap: Record<string, PendingRequest> = {};

  for (let pendingRequest of pendingRequests ?? []) {
    if (validate(pendingRequest.id)) {
      newPendingRequests.push(pendingRequest);
    } else {
      pendingRequestsMap[pendingRequest.id] = pendingRequest;
    }
  }

  const displayFriends: (Friend | PendingRequest)[] = [...newPendingRequests];

  for (let friend of friends ?? []) {
    const pendingChange = pendingRequestsMap[friend.id];

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
