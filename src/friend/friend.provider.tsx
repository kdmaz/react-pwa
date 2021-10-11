import { createContext, ReactNode, useContext, useState } from "react";
import { Friend } from "./friend.interface";

interface FriendState {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}

const FriendsContext = createContext<FriendState | undefined>(undefined);

interface FriendProviderProps {
  children: ReactNode;
}

function FriendProvider({ children }: FriendProviderProps): JSX.Element {
  const [friends, setFriends] = useState<Friend[]>([]);
  return (
    <FriendsContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendsContext.Provider>
  );
}

function useFriends(): FriendState {
  const context = useContext(FriendsContext);

  if (context === undefined) {
    throw new Error("useFriends must be used within a FriendProvider");
  }

  return context;
}

export { useFriends, FriendProvider };
