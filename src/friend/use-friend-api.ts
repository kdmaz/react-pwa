import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { friendsTable, pendingFriendsTable } from "../db";
import { useOnlineStatus } from "../useOnlineStatus";
import { Friend } from "./friend.interface";

const base = "/api/friends";

function useGetFriends(): () => Promise<void> {
  const onlineStatus = useOnlineStatus();

  const getFriends = useCallback(async () => {
    if (onlineStatus) {
      const { friends }: { friends: Friend[] } = await fetch(base).then((res) =>
        res.json()
      );

      await friendsTable.clear();
      await friendsTable.bulkAdd(friends);
    }
  }, [onlineStatus]);

  return getFriends;
}

function useAddFriend(): (friend: Friend) => Promise<void> {
  const onlineStatus = useOnlineStatus();

  const addFriend = useCallback(
    async ({ name, age }: Friend) => {
      if (onlineStatus) {
        const { friend }: { friend: Friend } = await fetch(base, {
          method: "POST",
          body: JSON.stringify({ name, age: +age }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());

        await friendsTable.add(friend);
      } else {
        const id = uuid();
        await pendingFriendsTable.add({
          id,
          name,
          age: +age,
          requestType: "post",
          time: Date.now(),
        });
      }
    },
    [onlineStatus]
  );

  return addFriend;
}

function useUpdateFriend(): (friend: Friend) => Promise<void> {
  const onlineStatus = useOnlineStatus();

  const updateFriend = useCallback(
    async ({ id, age, name }: Friend) => {
      if (onlineStatus) {
        const { friend }: { friend: Friend } = await fetch(`${base}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ name, age: +age }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());

        await friendsTable.update(id, friend);
      } else {
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
    },
    [onlineStatus]
  );

  return updateFriend;
}

function useDeleteFriend(): (friend: Friend) => Promise<void> {
  const onlineStatus = useOnlineStatus();

  const deleteFriend = useCallback(
    async ({ id, name, age }: Friend) => {
      if (onlineStatus) {
        await fetch(`${base}/${id}`, {
          method: "DELETE",
        });

        await friendsTable.delete(id);
      } else {
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
    },
    [onlineStatus]
  );

  return deleteFriend;
}

export { useGetFriends, useAddFriend, useUpdateFriend, useDeleteFriend };
