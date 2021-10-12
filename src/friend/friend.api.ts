import { Friend } from "./friend.interface";

const base = "/api/friends";

async function getFriends(): Promise<Friend[]> {
  const { friends }: { friends: Friend[] } = await fetch(base).then((res) =>
    res.json()
  );
  return friends;
}

async function addFriend({ name, age }: Friend): Promise<Friend> {
  const { friend }: { friend: Friend } = await fetch(base, {
    method: "POST",
    body: JSON.stringify({ name, age: +age }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return friend;
}

async function updateFriend({ id, name, age }: Friend): Promise<Friend> {
  const { friend }: { friend: Friend } = await fetch(`${base}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, age: +age }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return friend;
}

async function deleteFriend(id: string): Promise<string> {
  await fetch(`${base}/${id}`, {
    method: "DELETE",
  });
  return id;
}

export { getFriends, addFriend, updateFriend, deleteFriend };
