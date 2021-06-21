import { Bar } from "./Bar";
import { viz } from "../Viz"

jest.mock('../Viz');

describe('Bar', () => {
    it('should call viz.text()', () => {
        const widget = Bar(() => ({value: 1}), {});
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.text).toBeCalled();
    });
    it('should calculate height correctly', () => {
        (viz.rect as jest.Mock).mockClear();
        const widget = Bar(() => ({value: 1, maxValue: 4}), {});
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.rect).toBeCalledTimes(2);
        expect(viz.rect).toBeCalledWith(0, 0, 10, 10, {"fill": "transparent", "lineStyle": "solid", "stroke": "white"});
        expect(viz.rect).toBeCalledWith(0, 7.5, 10, 2.5, {"fill": "white", "lineStyle": "solid", "stroke": "transparent"});
    });
    it('should calculate height correctly for zero values', () => {
        (viz.rect as jest.Mock).mockClear();
        const widget = Bar(() => ({value: 0, maxValue: 4}), {});
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.rect).toBeCalledTimes(2);
        expect(viz.rect).toBeCalledWith(0, 0, 10, 10, {"fill": "transparent", "lineStyle": "solid", "stroke": "white"});
        expect(viz.rect).toBeCalledWith(0, 9.9, 10, 0.1, {"fill": "white", "lineStyle": "solid", "stroke": "transparent"});
    });
});