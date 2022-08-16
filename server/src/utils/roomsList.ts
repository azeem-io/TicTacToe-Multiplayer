interface Room {
    id: string;
    name: string;
}

const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];

export default rooms.map((room: string, index: number) => ({
    id: index.toString(),
    name: room,
}));
