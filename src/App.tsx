import { useState } from "react";
import "./App.css";
import { FriendList } from "./friend/friend-list";
import { FriendModal } from "./friend/friend-modal";
import { PendingFriendList } from "./friend/pending-friend-list";
import { useOnlineStatus } from "./useOnlineStatus";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const onlineStatus = useOnlineStatus();

  return (
    <div id="app" className={onlineStatus ? "online" : "offline"}>
      <div id="scrollable">
        <button onClick={() => setOpen(true)}>Add Friend</button>
        <FriendModal open={open} onClose={() => setOpen(false)} />

        <PendingFriendList />
        <FriendList />
      </div>
    </div>
  );
}

export default App;
