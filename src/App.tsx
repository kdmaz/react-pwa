import { useState } from "react";
import "./App.css";
import { AddFriendModal } from "./friend/add-friend-modal";
import { FriendList } from "./friend/friend-list";
import { PendingFriendList } from "./friend/pending-friend-list";
import { useOnlineStatus } from "./useOnlineStatus";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const onlineStatus = useOnlineStatus();

  return (
    <div id="app" className={onlineStatus ? "online" : "offline"}>
      <button onClick={() => setOpen(true)}>Add Friend</button>

      <PendingFriendList />

      <FriendList />

      <AddFriendModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
