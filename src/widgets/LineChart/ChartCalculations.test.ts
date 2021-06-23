import { calculateScaleFromSeries, chartSpaceToRoomPosition, scaleToChartSpace } from "./ChartCalculations"

describe('ChartCalculations', () => {
    describe('calculateScaleFromSeries', () => {
        it('should return Infinity for no series', () => {
            const scale = calculateScaleFromSeries({});
            expect(scale).toMatchObject({
                x: { min: Infinity, max: -Infinity },
                y: { min: Infinity, max: -Infinity }
            });
        });
        it('should return bounds for one series', () => {
            const scale = calculateScaleFromSeries({
                s1: [
                    [0, 1],
                    [1, 2],
                    [3, 4]
                ]
            });
            expect(scale).toMatchObject({
                x: { min: 0, max: 3 },
                y: { min: 1, max: 4 }
            });
        });
        it('should return bounds for multiple series', () => {
            const scale = calculateScaleFromSeries({
                s1: [
                    [0, 1],
                    [1, 2],
                    [3, 4]
                ],
                s2: [
                    [0, -1],
                    [-1, -2],
                    [-3, -4]
                ]
            });
            expect(scale).toMatchObject({
                x: { min: -3, max: 3 },
                y: { min: -4, max: 4 }
            });
        });
    });
    describe('scaleToChartSpace', () => {
        it('should scale border coordinates', () => {
            const scale = {
                x: { min: 0, max: 2 },
                y: { min: 1, max: 3 }
            };
            const coords1 = scaleToChartSpace(scale, [0, 1]);
            const coords2 = scaleToChartSpace(scale, [2, 3]);
            expect(coords1).toMatchObject({ x: 0, y: 0 });
            expect(coords2).toMatchObject({ x: 1, y: 1 });
        })
        it('should scale inside coordinates', () => {
            const scale = {
                x: { min: 0, max: 2 },
                y: { min: 1, max: 3 }
            };
            const coords1 = scaleToChartSpace(scale, [1, 2]);
            expect(coords1).toMatchObject({ x: 0.5, y: 0.5 });
        })
        it('should clamp outside coordinates', () => {
            const scale = {
                x: { min: 0, max: 2 },
                y: { min: 1, max: 3 }
            };
            const coords1 = scaleToChartSpace(scale, [-1, 0]);
            const coords2 = scaleToChartSpace(scale, [3, 4]);
            expect(coords1).toMatchObject({ x: 0, y: 0 });
            expect(coords2).toMatchObject({ x: 1, y: 1 });
        })
    });
    describe('chartSpaceToRoomPosition', () => {
        it('should convert coordinates accurately', () => {
            expect(chartSpaceToRoomPosition(0, 0, 10, 10, {x: 0.5, y: 0.5})).toMatchObject([5, 5])
            expect(chartSpaceToRoomPosition(0, 0, 10, 10, {x: 0, y: 0})).toMatchObject([0, 10])
            expect(chartSpaceToRoomPosition(0, 0, 10, 10, {x: 1, y: 1})).toMatchObject([10, 0])
        })
    })
})