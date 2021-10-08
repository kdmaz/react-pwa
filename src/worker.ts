import { rest, setupWorker } from "msw";
import { Friend } from "./friend/friend.interface";

let friends: Friend[] = [
  {
    id: 1,
    name: "Bob",
    age: 43,
  },
  {
    id: 2,
    name: "Suzy",
    age: 53,
  },
];

let currentId = 3;

export const worker = setupWorker(
  rest.get("/api/friends", (req, res, ctx) => {
    return res(ctx.json({ friends }));
  }),
  rest.post("/api/friends", (req, res, ctx) => {
    const friend: Friend = { id: currentId, ...(req.body as Friend) };
    friends.push(friend);
    currentId++;
    return res(ctx.json({ friend }));
  }),
  rest.patch("/api/friends/:id", (req, res, ctx) => {
    const id = +req.params.id;
    const friend: Friend = { id, ...(req.body as Friend) };
    let index = friends.findIndex((friend) => friend.id === id);
    friends[index] = friend;
    return res(ctx.json({ friend }));
  }),
  rest.delete("/api/friends/:id", (req, res, ctx) => {
    const id = +req.params.id;
    friends = friends.filter((friend) => friend.id !== id);
    return res(ctx.status(204));
  })
);
