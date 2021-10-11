import { useState } from "react";
import { pendingFriendsTable } from "../db";
import { Modal } from "../modal";
import { useOnlineStatus } from "../useOnlineStatus";
import { Friend } from "./friend.interface";
import { useFriends } from "./friend.provider";

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddFriendModal({ onClose, open }: Props) {
  const onlineStatus = useOnlineStatus();
  const { friends, setFriends } = useFriends();
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const isInvalid = () => {
    return !name || !age || isNaN(+age);
  };

  const reset = () => {
    setName("");
    setAge("");
  };

  const onCloseAddFriend = () => {
    onClose();
    reset();
  };

  const handleAddFriend = async () => {
    if (isInvalid()) {
      return;
    }

    // online
    if (onlineStatus) {
      const { friend }: { friend: Friend } = await fetch("/api/friends", {
        method: "POST",
        body: JSON.stringify({ name, age: +age }),
      }).then((res) => res.json());

      setFriends([...friends, friend]);
    } else {
      // offline
      await pendingFriendsTable.add({
        name: name as string,
        age: +(age as string),
        requestType: "post",
      });
    }

    onCloseAddFriend();
  };

  return (
    <Modal open={open} onClose={onCloseAddFriend}>
      <h2>Add Friend</h2>
      <div>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="age">Age</label>
        </div>
        <div>
          <input
            name="age"
            type="text"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <button onClick={handleAddFriend}>Add</button>
      </div>
    </Modal>
  );
}

export { AddFriendModal };
