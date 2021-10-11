import React, { useContext, useEffect, useState } from "react";

const OnlineStatusContext = React.createContext<boolean | undefined>(undefined);

const OnlineStatusProvider: React.FC = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

const useOnlineStatus = () => {
  const context = useContext(OnlineStatusContext);

  if (context === undefined) {
    throw new Error("useOnlienStatus must be used within OnlineStatusProvider");
  }

  return context;
};

export { useOnlineStatus, OnlineStatusProvider };
