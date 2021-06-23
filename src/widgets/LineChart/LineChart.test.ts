import { LineChart } from "./LineChart";
import { viz } from "../../Viz"

jest.mock('../../Viz');

describe('LineChart', () => {
    it('should display label', () => {
        const widget = LineChart(() => ({}), {
            label: 'chart'
        });
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz.text).toBeCalledWith('chart', 5, 10);
    });
});