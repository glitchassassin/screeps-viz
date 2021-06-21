import { Grid } from "./Grid";

describe('Grid', () => {
    it('should call widget', () => {
        const subWidget1 = jest.fn();
        const subWidget2 = jest.fn();
        const widget = Grid({rows: 1, columns: 2}, [subWidget1, subWidget2]);
        widget({x: 0, y: 0}, 10, 10, {})
        expect(subWidget1).toBeCalledWith({x: 0, y: 0}, 4.5, 10, {});
        expect(subWidget2).toBeCalledWith({x: 5.5, y: 0}, 4.5, 10, {});
    });
});