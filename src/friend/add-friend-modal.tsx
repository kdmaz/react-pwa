import { useState } from "react";
import { friendTable } from "../db";
import { Modal } from "../modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddFriendModal({ onClose, open }: Props) {
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
    if (true) {
      console.log(
        `adding friend while online name: (${name}) and age: (${age})`
      );
    }

    // offline
    if (false) {
      await friendTable.put({
        name: name as string,
        age: +(age as string),
      });
    }

    onCloseAddFriend();
  };

  return (
    <Modal open={open} onClose={onCloseAddFriend}>
      <h2>Add Friend</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="text"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>

      <div>
        <button onClick={handleAddFriend}>Add</button>
      </div>
    </Modal>
  );
}

export { AddFriendModal };
