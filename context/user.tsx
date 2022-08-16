import { createContext, useState } from "react";

export type UserContextType = {
    username: string;
    setUsername: (username: string) => void;
};

const defaultState: UserContextType = {
    username: "",

    setUsername: () => {
        console.log("default function");
    },
};

export const UserContext = createContext<UserContextType>(defaultState);

// export const UserProvider: React.FC = ({ children }) => {
//   const [username, setUsername] = useState<string>('');

//   return (
//     <UserContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
