export interface Friend {
  id: string;
  name: string;
  age: number;
}

export interface PendingFriend extends Friend {
  requestType: "post" | "patch" | "delete";
  time: number;
}
