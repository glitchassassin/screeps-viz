import { Bar } from "./Bar";
import { viz } from "../Viz"

jest.mock('../Viz');

describe('Bar', () => {
    it('should call viz().text()', () => {
        const widget = Bar(() => ({
            data: {value: 1}
        }));
        widget({ pos: {x: 0, y: 0}, width: 10, height: 10 })
        expect(viz().text).toBeCalled();
    });
    it('should calculate height correctly', () => {
        (viz().rect as jest.Mock).mockClear();
        const widget = Bar(() => ({
            data: {value: 1, maxValue: 4}
        }));
        widget({ pos: {x: 0, y: 0}, width: 10, height: 10 })
        expect(viz().rect).toBeCalledTimes(2);
        expect(viz().rect).toBeCalledWith(0, 0, 10, 9, {"fill": "transparent", "lineStyle": "solid", "stroke": "white"});
        expect(viz().rect).toBeCalledWith(0, 6.75, 10, 2.25, {"fill": "white", "lineStyle": "solid", "stroke": "transparent"});
    });
    it('should calculate height correctly for zero values', () => {
        (viz().rect as jest.Mock).mockClear();
        const widget = Bar(() => ({
            data: {value: 0, maxValue: 4}
        }));
        widget({ pos: {x: 0, y: 0}, width: 10, height: 10 })
        expect(viz().rect).toBeCalledTimes(2);
        expect(viz().rect).toBeCalledWith(0, 0, 10, 9, {"fill": "transparent", "lineStyle": "solid", "stroke": "white"});
        expect(viz().rect).toBeCalledWith(0, 8.9, 10, 0.1, {"fill": "white", "lineStyle": "solid", "stroke": "transparent"});
    });
});