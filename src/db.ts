import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Friend } from "./friend/friend.interface";

const db = new Dexie("myDatabase");

db.version(1).stores({
  friends: "++id,name,age",
});

const friendTable = db.table<Friend>("friends");

export { friendTable, useLiveQuery };
