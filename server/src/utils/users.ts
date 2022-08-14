interface User {
  id: string;
  username: string;
  room: string;
}

const users: User[] = [];

// Join user to chat
export const userJoin = (id: any, username: string, room: any) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

// Get current user
export const getCurrentUser = (id: any) => {
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

// Get room users
export const getRoomUsers = (room: any) => {
  return users.filter((user) => user.room === room);
};
