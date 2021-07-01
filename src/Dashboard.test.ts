import { Dashboard } from "./Dashboard";
import { setRoom } from "./Viz";

jest.mock('./Viz');

describe('Dashboard', () => {
    beforeEach(() => {
        (setRoom as jest.Mock).mockClear();
    })
    it('should call widget method', () => {
        const widget = jest.fn();
        const pos = {
            x: 0,
            y: 0
        };
        const width = 0;
        const height = 0;
        Dashboard({
            widgets: [
                {
                    widget,
                    pos,
                    width,
                    height
                }
            ]
        });
        expect(widget).toBeCalledWith({ pos, width, height });
    });
    it('should set a given room', () => {
        Dashboard({ 
            widgets: [], 
            config: { room: 'room' }
        });
        expect(setRoom).toHaveBeenCalledWith('room');
    })
})