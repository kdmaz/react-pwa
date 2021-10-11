import { pendingFriendsTable, useLiveQuery } from "../db";
import "./pending-friend-list.css";

function PendingFriendList() {
  const pendingFriends = useLiveQuery(() => pendingFriendsTable.toArray(), []);

  if (!pendingFriends || !pendingFriends.length) {
    return null;
  }

  const handleDelete = async (id: string) => {
    await pendingFriendsTable.delete(id);
  };

  const getDateAndTime = (time: number): string => {
    const date = new Date(time);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  };

  return (
    <div className="pending">
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
                <button onClick={() => handleDelete(id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export { PendingFriendList };
