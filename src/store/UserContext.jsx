//https://leetcode-stats-api.herokuapp.com/utopian-coder
//https://codeforces.com/api/user.status?handle=utopian-coder

import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [usernames, setUsernames] = useState(null);

  return (
    <UserContext.Provider value={{ usernames, setUsernames }}>
      {children}
    </UserContext.Provider>
  );
};
