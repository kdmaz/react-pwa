import { useState } from "react";
import "./App.css";
import { friendTable, useLiveQuery } from "./db";
import { AddFriendModal } from "./friend/add-friend-modal";
import { FriendList } from "./friend/friend-list";

function App() {
  const allFriends = useLiveQuery(() => friendTable.toArray(), []);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Friend</button>

      <FriendList />

      <AddFriendModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
