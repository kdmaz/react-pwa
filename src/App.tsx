import { useState } from "react";
import { AddFriendModal } from "./friend/add-friend-modal";
import { FriendList } from "./friend/friend-list";
import { PendingFriendList } from "./friend/pending-friend-list";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Friend</button>

      <PendingFriendList />

      <FriendList />

      <AddFriendModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
