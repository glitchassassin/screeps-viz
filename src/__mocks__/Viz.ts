const roomVisual = {
    text: jest.fn(),
    rect: jest.fn(),
    poly: jest.fn()
}

export const setRoom = jest.fn()

export const viz = () => roomVisual;