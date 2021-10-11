import { useEffect } from "react";
import { Friend } from "./friend.interface";
import { useFriends } from "./friend.provider";

function FriendList() {
  const { friends, setFriends } = useFriends();

  useEffect(() => {
    fetch("/api/friends")
      .then((res) => res.json())
      .then((data: { friends: Friend[] }) => {
        setFriends(data.friends);
      });
  }, [setFriends]);

  if (!friends || !friends.length) {
    return <h2>You have no friends ;_;</h2>;
  }

  return (
    <>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <div>name: {friend.name}</div>
            <div>age: {friend.age}</div>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export { FriendList };
