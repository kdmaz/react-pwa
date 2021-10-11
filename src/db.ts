import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Friend, PendingFriend } from "./friend/friend.interface";

const db = new Dexie("friendsDatabase");

db.version(1).stores({
  pendingFriends: "id",
  friends: "id",
});

const pendingFriendsTable = db.table<PendingFriend>("pendingFriends");
const friendsTable = db.table<Friend>("friends");

export { friendsTable, pendingFriendsTable, useLiveQuery };
