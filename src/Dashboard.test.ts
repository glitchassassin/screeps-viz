import { Dashboard } from "./Dashboard";

describe('Dashboard', () => {
    it('should generate a function', () => {
        const dashboard = Dashboard({});
        expect(dashboard).toBeInstanceOf(Function);
    });
    it('should call widget method', () => {
        const widget = jest.fn();
        const pos = {
            x: 0,
            y: 0
        };
        const width = 0;
        const height = 0;
        const args = {};
        const dashboard = Dashboard({
            widgets: [
                {
                    widget,
                    pos,
                    width,
                    height
                }
            ]
        })
        dashboard(args);
        expect(widget).toBeCalledWith(pos, width, height, args);
    });
})