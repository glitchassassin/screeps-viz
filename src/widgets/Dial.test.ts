import { viz } from "../Viz"
import { Dial } from "./Dial";

jest.mock('../Viz');

describe('Dial', () => {
    it('should call viz().text()', () => {
        const widget = Dial(() => ({
            data: {value: 1}
        }));
        widget({ pos: {x: 0, y: 0}, width: 10, height: 10 })
        expect(viz().text).toBeCalled();
        expect(viz().poly).toBeCalledTimes(2);
    });
});