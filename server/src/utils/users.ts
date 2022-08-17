interface User {
    id: string;
    username: string;
    roomId: string;
    isPlaying: boolean;
}

const users: User[] = [];

// Join user to chat
export const userJoin = (
    id: any,
    username: string,
    roomId: any,
    isPlaying: boolean
) => {
    const user = { id, username, roomId, isPlaying };
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

export const setAsSpectating = (id: any) => {
    const user = getCurrentUser(id);
    if (user) {
        user.isPlaying = false;
    }
    return user;
};

// Get room users
export const getRoomUsers = (roomId: any) => {
    return users.filter((user) => user.roomId === roomId);
};
