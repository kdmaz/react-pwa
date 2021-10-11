import { pendingFriendsTable, useLiveQuery } from "../db";
import "./pending-friend-list.css";

function PendingFriendList() {
  const pendingFriends = useLiveQuery(() => pendingFriendsTable.toArray(), []);

  if (!pendingFriends || !pendingFriends.length) {
    return null;
  }

  const handleDelete = (id: number) => {
    pendingFriendsTable.delete(id);
  };

  return (
    <div className="pending">
      <h2>Pending</h2>
      <ul>
        {pendingFriends.map(({ id, name, age }) => (
          <li key={id}>
            <div>name: {name}</div>
            <div>age: {age}</div>
            <div>
              <button onClick={() => handleDelete(id as number)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { PendingFriendList };
