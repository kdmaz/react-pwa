import { ReactNode } from "react";
import { FriendProvider } from "./friend/friend.provider";
import { OnlineStatusProvider } from "./useOnlineStatus";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <OnlineStatusProvider>
      <FriendProvider>{children}</FriendProvider>
    </OnlineStatusProvider>
  );
}
