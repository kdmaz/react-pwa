import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Friend, PendingRequest } from "./friend/friend.interface";

const db = new Dexie("friendsDatabase");

db.version(1).stores({
  pendingRequests: "id",
  friends: "id",
});

const pendingRequestsTable = db.table<PendingRequest>("pendingRequests");
const friendsTable = db.table<Friend>("friends");

export { friendsTable, pendingRequestsTable, useLiveQuery };
