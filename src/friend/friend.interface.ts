export interface Friend {
  id: string;
  name: string;
  age: number;
}

export interface PendingRequest extends Friend {
  requestType: "post" | "patch" | "delete";
  time: number;
}
