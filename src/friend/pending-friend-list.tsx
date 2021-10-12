import { pendingFriendsTable, useLiveQuery } from "../db";
import { useOnlineStatus } from "../useOnlineStatus";
import "./pending-friend-list.css";
import { removePendingRequest } from "./pending-friend.storage";
import { useSyncPendingRequests } from "./use-sync.api";

function PendingFriendList() {
  const { syncPendingRequests } = useSyncPendingRequests();
  const onlineStatus = useOnlineStatus();
  const pendingFriends = useLiveQuery(() => pendingFriendsTable.toArray(), []);

  if (!pendingFriends || !pendingFriends.length) {
    return null;
  }

  const getDateAndTime = (time: number): string => {
    const date = new Date(time);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  };

  return (
    <div className="pending">
      {onlineStatus && (
        <button onClick={() => syncPendingRequests(pendingFriends)}>
          Sync To Server
        </button>
      )}
      <h2>Pending</h2>
      <ul>
        {pendingFriends
          .sort((a, b) => a?.time - b?.time)
          .map(({ id, name, age, requestType, time }) => (
            <li key={id}>
              <div>name: {name}</div>
              <div>age: {age}</div>
              <div>request type: {requestType}</div>
              <div>time: {getDateAndTime(time)}</div>
              <div>
                <button onClick={() => removePendingRequest(id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export { PendingFriendList };
