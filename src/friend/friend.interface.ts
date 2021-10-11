export interface Friend {
  id: string;
  name: string;
  age: number;
}

export interface PendingFriend {
  id: string;
  name: string;
  age: number;
  requestType: "get" | "post" | "patch" | "delete";
  time: number;
}
