export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export interface PendingFriend extends Friend {
  requestType: "get" | "post" | "patch" | "delete";
}
