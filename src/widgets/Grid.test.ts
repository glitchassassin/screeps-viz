import { Grid } from "./Grid";

describe('Grid', () => {
    it('should call widget', () => {
        const subWidget1 = jest.fn();
        const subWidget2 = jest.fn();
        const widget = Grid(() => ({
            data: [subWidget1, subWidget2], 
            config: {rows: 1, columns: 2}
        }));
        widget({
            pos: {x: 0, y: 0}, 
            width: 10, 
            height: 10
        })
        expect(subWidget1).toBeCalledWith({ pos: {x: 0, y: 0}, width: 4.5, height: 10 });
        expect(subWidget2).toBeCalledWith({ pos: {x: 5.5, y: 0}, width: 4.5, height: 10 });
    });
});