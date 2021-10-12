import { useCallback, useEffect, useState } from "react";
import { Modal } from "../modal";
import { Friend } from "./friend.interface";
import { useFriendApiAndStorage } from "./use-friend-api-and-storage";

interface Props {
  friend?: Friend;
  open: boolean;
  onClose: () => void;
}

function FriendModal({ onClose, open, friend }: Props) {
  const { addFriendAndSyncDb, updateFriendAndSyncDb } =
    useFriendApiAndStorage();

  const [name, setName] = useState<string>(friend?.name ?? "");
  const [age, setAge] = useState<string>(`${friend?.age ?? ""}`);
  const [status, setStatus] = useState<"editing" | "adding" | "idle" | "error">(
    "idle"
  );
  const id = friend?.id as string;

  const isAdding = status === "adding";
  const isEditing = status === "editing";
  const modalType = !friend ? "Add" : "Edit";
  const isLoading = isAdding || isEditing;

  const onCloseFriendModal = useCallback(() => {
    onClose();
    setName("");
    setAge("");
  }, [onClose]);

  useEffect(() => {
    if (isAdding) {
      addFriendAndSyncDb({ id: "", name, age: +age })
        .then(() => {
          setStatus("idle");
          onCloseFriendModal();
        })
        .catch(() => setStatus("error"));
    }
  }, [addFriendAndSyncDb, age, isAdding, name, onCloseFriendModal]);

  useEffect(() => {
    if (isEditing) {
      updateFriendAndSyncDb({ id, name, age: +age })
        .then(() => {
          setStatus("idle");
          onCloseFriendModal();
        })
        .catch(() => setStatus("error"));
    }
  }, [age, id, isEditing, name, onCloseFriendModal, updateFriendAndSyncDb]);

  const isInvalid = () => {
    return !name || !age || isNaN(+age);
  };

  const handleChangeFriend = () => {
    if (isInvalid()) {
      return;
    }

    !friend ? setStatus("adding") : setStatus("editing");
  };

  return (
    <Modal open={open} onClose={onCloseFriendModal}>
      <h2>{modalType} Friend</h2>
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
        <button disabled={isLoading} onClick={handleChangeFriend}>
          {modalType}
        </button>
      </div>
    </Modal>
  );
}

export { FriendModal };
