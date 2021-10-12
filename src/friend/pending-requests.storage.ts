import { v4 as uuid } from "uuid";
import { friendsTable, pendingRequestsTable } from "../db";
import { Friend } from "./friend.interface";

async function addFriendToPending({ name, age }: Friend): Promise<void> {
  const id = uuid();
  await pendingRequestsTable.add({
    id,
    name,
    age: +age,
    requestType: "post",
    time: Date.now(),
  });
}

async function updateFriendToPending({ id, name, age }: Friend): Promise<void> {
  let pendingUpdate = await pendingRequestsTable.get(id);
  if (
    pendingUpdate?.requestType === "post" ||
    pendingUpdate?.requestType === "patch"
  ) {
    await pendingRequestsTable.update(id, {
      name,
      age: +age,
      time: Date.now(),
    });
  } else if (pendingUpdate?.requestType === "delete") {
    await pendingRequestsTable.update(id, {
      name,
      age: +age,
      requestType: "patch",
      time: Date.now(),
    });
  } else {
    await pendingRequestsTable.add({
      id,
      name,
      age: +age,
      requestType: "patch",
      time: Date.now(),
    });
  }
}

async function deleteFriendToPending({ id, name, age }: Friend): Promise<void> {
  let pendingUpdate = await pendingRequestsTable.get(id);
  if (pendingUpdate?.requestType === "post") {
    await pendingRequestsTable.delete(id);
  } else if (pendingUpdate?.requestType === "patch") {
    const { name, age } = (await friendsTable.get(id)) as Friend;
    await pendingRequestsTable.update(id, {
      name,
      age,
      requestType: "delete",
      time: Date.now(),
    });
  } else if (!pendingUpdate) {
    await pendingRequestsTable.add({
      id,
      name,
      age: +age,
      requestType: "delete",
      time: Date.now(),
    });
  }
}

async function removePendingRequest(id: string): Promise<void> {
  await pendingRequestsTable.delete(id);
}

export {
  addFriendToPending,
  updateFriendToPending,
  deleteFriendToPending,
  removePendingRequest,
};
