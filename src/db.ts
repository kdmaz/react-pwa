import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { PendingFriend } from "./friend/friend.interface";

const db = new Dexie("friendsDatabase");

db.version(1).stores({
  pendingFriends: "++id,name,age,requestType",
});

const pendingFriendsTable = db.table<PendingFriend>("pendingFriends");

export { pendingFriendsTable, useLiveQuery };
