import { useEffect, useState } from "react";
import "./friend-list.css";
import { FriendModal } from "./friend-modal";
import { Friend } from "./friend.interface";
import { useFriendApiAndStorage } from "./use-friend-api-and-storage";
import { useFriendList } from "./use-friend-list";

function FriendList() {
  const { getFriendsAndSyncDb, deleteFriendAndSyncDb } =
    useFriendApiAndStorage();
  const friends = useFriendList();
  const [state, setState] = useState<{
    open: boolean;
    friend: Friend | undefined;
  }>({ open: false, friend: undefined });
  const [friend, setFriend] = useState<Friend | undefined>();
  const [status, setStatus] = useState<
    "idle" | "deleting" | "getting" | "error"
  >("idle");

  const isDeleting = status === "deleting";
  const id = friend?.id;

  useEffect(() => {
    setStatus("getting");
    getFriendsAndSyncDb().then(() => setStatus("idle"));
  }, [getFriendsAndSyncDb]);

  useEffect(() => {
    if (isDeleting && id) {
      deleteFriendAndSyncDb(friend).then(() => {
        setFriend(undefined);
        setStatus("idle");
      });
    }
  }, [id, isDeleting, deleteFriendAndSyncDb, friend]);

  function handleEditFriend(friend: Friend): void {
    setState({ open: true, friend });
  }

  function handleDeleteFriend(friendToDelete: Friend) {
    setFriend(friendToDelete);
    setStatus("deleting");
  }

  if (status === "getting") {
    return <div>loading...</div>;
  }

  if (!friends || !friends.length) {
    return <h2>You have no friends ;_;</h2>;
  }

  return (
    <div className="friends">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <div>name: {friend.name}</div>
            <div>age: {friend.age}</div>
            <div>
              <button onClick={() => handleEditFriend(friend)}>Edit</button>
              <button onClick={() => handleDeleteFriend(friend)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {state.friend && (
        <FriendModal
          open={state.open}
          onClose={() => setState({ open: false, friend: undefined })}
          friend={state.friend}
        />
      )}
    </div>
  );
}

export { FriendList };
