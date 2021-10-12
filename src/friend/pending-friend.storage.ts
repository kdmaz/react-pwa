import { v4 as uuid } from "uuid";
import { friendsTable, pendingFriendsTable } from "../db";
import { Friend } from "./friend.interface";

async function addFriendToPending({ name, age }: Friend): Promise<void> {
  const id = uuid();
  await pendingFriendsTable.add({
    id,
    name,
    age: +age,
    requestType: "post",
    time: Date.now(),
  });
}

async function updateFriendToPending({ id, name, age }: Friend): Promise<void> {
  let pendingUpdate = await pendingFriendsTable.get(id);
  if (
    pendingUpdate?.requestType === "post" ||
    pendingUpdate?.requestType === "patch"
  ) {
    await pendingFriendsTable.update(id, {
      name,
      age: +age,
      time: Date.now(),
    });
  } else if (pendingUpdate?.requestType === "delete") {
    await pendingFriendsTable.update(id, {
      name,
      age: +age,
      requestType: "patch",
      time: Date.now(),
    });
  } else {
    await pendingFriendsTable.add({
      id,
      name,
      age: +age,
      requestType: "patch",
      time: Date.now(),
    });
  }
}

async function deleteFriendToPending({ id, name, age }: Friend): Promise<void> {
  let pendingUpdate = await pendingFriendsTable.get(id);
  if (pendingUpdate?.requestType === "post") {
    await pendingFriendsTable.delete(id);
  } else if (pendingUpdate?.requestType === "patch") {
    const { name, age } = (await friendsTable.get(id)) as Friend;
    await pendingFriendsTable.update(id, {
      name,
      age,
      requestType: "delete",
      time: Date.now(),
    });
  } else if (!pendingUpdate) {
    await pendingFriendsTable.add({
      id,
      name,
      age: +age,
      requestType: "delete",
      time: Date.now(),
    });
  }
}

export { addFriendToPending, updateFriendToPending, deleteFriendToPending };
