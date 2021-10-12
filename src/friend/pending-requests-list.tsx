import { pendingRequestsTable, useLiveQuery } from "../db";
import { useOnlineStatus } from "../useOnlineStatus";
import "./pending-requests-list.css";
import { removePendingRequest } from "./pending-requests.storage";
import { useSyncPendingRequests } from "./use-sync.api";

function PendingRequestsList() {
  const { syncPendingRequests } = useSyncPendingRequests();
  const onlineStatus = useOnlineStatus();
  const pendingRequests = useLiveQuery(
    () => pendingRequestsTable.toArray(),
    []
  );

  if (!pendingRequests || !pendingRequests.length) {
    return null;
  }

  const getDateAndTime = (time: number): string => {
    const date = new Date(time);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  };

  return (
    <div className="pending">
      {onlineStatus && (
        <button onClick={() => syncPendingRequests(pendingRequests)}>
          Sync To Server
        </button>
      )}
      <h2>Pending</h2>
      <ul>
        {pendingRequests
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

export { PendingRequestsList };
