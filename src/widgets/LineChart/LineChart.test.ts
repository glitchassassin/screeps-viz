import { LineChart } from "./LineChart";
import { Timeseries } from "metrics/Timeseries";
import { viz } from "../../Viz"

jest.mock('../../Viz');

describe('LineChart', () => {
    it('should display label', () => {
        const widget = LineChart(() => ({}), {
            label: 'chart'
        });
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz().text).toBeCalledWith('chart', 5, 10);
    });
    it('should plot series', () => {
        const widget = LineChart(() => ({
            series1: [
                [0, 1],
                [1, 2],
            ]
        }), {
            label: 'chart'
        });
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz().poly).toBeCalled();
    });
    it('should plot timeseries', () => {
        const timeseries: Timeseries = {
            values: [
                [0, 1],
                [1, 2],
            ]
        }
        const widget = LineChart(() => ({
            series1: timeseries
        }), {
            label: 'chart'
        });
        widget({x: 0, y: 0}, 10, 10, {})
        expect(viz().poly).toBeCalled();
    });
});