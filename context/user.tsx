import { createContext, useState } from "react";

export type UserContextType = {
    state: {
        username: string;
        room: string;
    };

    setUsername: (username: string) => void;
    setRoom: (room: string) => void;
};

const defaultState: UserContextType = {
    state: {
        username: "default",
        room: "",
    },

    setUsername: () => {
        console.log("default function");
    },
    setRoom: () => {
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
