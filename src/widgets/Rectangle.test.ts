import { Rectangle } from "./Rectangle";
import { viz } from "../Viz"

jest.mock('../Viz');

describe('Rectangle', () => {
    beforeEach(() => {
        (viz.rect as jest.Mock).mockClear();
    })
    it('should call viz.rect()', () => {
        const subWidget = jest.fn();
        const widget = Rectangle(subWidget);
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.rect).toBeCalledWith(0, 0, 10, 10, {"fill": "black", "lineStyle": "solid", "opacity": 0.3, "stroke": "white"});
    });
    it('should call widget', () => {
        const subWidget = jest.fn();
        const widget = Rectangle(subWidget);
        widget({x: 0, y: 0}, 10, 10, {})
        expect(subWidget).toBeCalled();
    });
});