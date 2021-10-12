import { friendsTable } from "../db";
import { Friend } from "./friend.interface";

async function getFriendsToDb(friends: Friend[]): Promise<void> {
  await friendsTable.clear();
  await friendsTable.bulkAdd(friends);
}

async function addFriendToDb(friend: Friend): Promise<void> {
  await friendsTable.add(friend);
}

async function updateFriendToDb(friend: Friend): Promise<void> {
  await friendsTable.update(friend.id, friend);
}

async function deleteFriendToDb(id: string): Promise<void> {
  await friendsTable.delete(id);
}

export { getFriendsToDb, addFriendToDb, updateFriendToDb, deleteFriendToDb };
