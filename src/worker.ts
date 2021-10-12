import { rest, setupWorker } from "msw";
import { Friend } from "./friend/friend.interface";

function incrementCurrentIndex(): void {
  let currentIndex = getCurrentIndex();
  currentIndex++;
  window.localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
}

function getCurrentIndex(): number {
  let value = window.localStorage.getItem("currentIndex");

  if (value === undefined || value === null) {
    value = "1";
    window.localStorage.setItem("currentIndex", value);
  }

  return +value;
}

function setFriends(friends: Friend[]): void {
  window.localStorage.setItem("friends", JSON.stringify(friends));
}

function getFriends(): Friend[] {
  let value: any = window.localStorage.getItem("friends");
  let friends: Friend[];

  try {
    friends = JSON.parse(value) ?? [];
  } catch (e) {
    window.localStorage.setItem("friends", JSON.stringify([]));
    friends = [];
  }

  return friends;
}

let friends = getFriends();
const delayLength = 0;

export const worker = setupWorker(
  rest.get("/api/friends", (req, res, ctx) => {
    return res(ctx.delay(delayLength), ctx.json({ friends }));
  }),
  rest.post("/api/friends", (req, res, ctx) => {
    const { name, age } = req.body as Friend;
    const friend: Friend = { id: `${getCurrentIndex()}`, name, age };
    friends.push(friend);
    setFriends(friends);
    incrementCurrentIndex();
    return res(ctx.delay(delayLength), ctx.json({ friend }));
  }),
  rest.patch("/api/friends/:id", (req, res, ctx) => {
    const id = req.params.id;
    const { name, age } = req.body as Friend;
    const friend: Friend = { id, name, age };
    let index = friends.findIndex((friend) => friend.id === id);
    friends[index] = friend;
    setFriends(friends);
    return res(ctx.delay(delayLength), ctx.json({ friend }));
  }),
  rest.delete("/api/friends/:id", (req, res, ctx) => {
    const id = req.params.id;
    friends = friends.filter((friend) => friend.id !== id);
    setFriends(friends);
    return res(ctx.delay(delayLength), ctx.status(204));
  })
);
