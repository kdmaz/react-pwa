import { rest, setupWorker } from "msw";
import { Friend } from "./friend/friend.interface";

let friends: Friend[] = [
  {
    id: "1",
    name: "Bob",
    age: 43,
  },
  {
    id: "2",
    name: "Suzy",
    age: 53,
  },
];

let currentId = 3;
const delayLength = 0;

export const worker = setupWorker(
  rest.get("/api/friends", (req, res, ctx) => {
    return res(ctx.delay(delayLength), ctx.json({ friends }));
  }),
  rest.post("/api/friends", (req, res, ctx) => {
    const { name, age } = req.body as Friend;
    const friend: Friend = { id: `${currentId}`, name, age };
    friends.push(friend);
    currentId++;
    return res(ctx.delay(delayLength), ctx.json({ friend }));
  }),
  rest.patch("/api/friends/:id", (req, res, ctx) => {
    const id = req.params.id;
    const { name, age } = req.body as Friend;
    const friend: Friend = { id, name, age };
    let index = friends.findIndex((friend) => friend.id === id);
    friends[index] = friend;
    return res(ctx.delay(delayLength), ctx.json({ friend }));
  }),
  rest.delete("/api/friends/:id", (req, res, ctx) => {
    const id = req.params.id;
    friends = friends.filter((friend) => friend.id !== id);
    return res(ctx.delay(delayLength), ctx.status(204));
  })
);
