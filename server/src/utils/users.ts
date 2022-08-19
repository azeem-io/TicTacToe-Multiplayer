import { formatMessage } from "./message";

interface User {
   id: string;
   username: string;
   roomId: string;
   isPlaying: boolean;
}

const users: User[] = [];

// gives all users on server
export const getAllUsers = (): User[] => users;

// Join user to chat
export const userJoin = (
   id: string,
   username: string,
   roomId: string,
   isPlaying: boolean
) => {
   const user = { id, username, roomId, isPlaying };
   users.push(user);
   return user;
};

// Get current user
export const getCurrentUser = (id: string) => {
   return users.find((user) => user.id === id);
};

// User leave chat
export const userLeave = (id: string) => {
   const index = users.findIndex((user) => user.id == id);

   // not find it return -1
   if (index !== -1) {
      return users.splice(index, 1)[0];
   }

   return;
};

export const setAsSpectating = (id: string, socket: any) => {
   const user = getCurrentUser(id);
   if (user && user.isPlaying) {
      user.isPlaying = false;
      // if ( socket ) {
      socket.broadcast
         .to(user.roomId)
         .emit(
            "broadcastMessage",
            formatMessage("Chat Bot", `${user.username} is now spectating`)
         );
      // }
   }
   return user;
};

export const getRoomUsers = (roomId: string) => {
   return users.filter((user) => user.roomId === roomId);
};

export const getPlayers = (roomId: string) => {
   return getRoomUsers(roomId).filter((user) => user.isPlaying);
};

export const getSpectators = (roomId: string) => {
   return getRoomUsers(roomId).filter((user) => !user.isPlaying);
};
