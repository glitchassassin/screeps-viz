export let roomVisual = new RoomVisual();

export const setRoom = (room?: string) => {
    roomVisual = new RoomVisual(room);
}

export const viz = () => roomVisual;