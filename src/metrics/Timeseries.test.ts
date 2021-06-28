import { DeltaTimeseries, Timeseries, avg, granularity, head, max, min, newTimeseries, sum, tail, update, updateDelta, updateNonNegativeDelta } from "./Timeseries";

describe('Timeseries', () => {
    it('should calculate max', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(max(timeseries)).toEqual([0, 3])
        expect(max(timeseries, 0)).toEqual([2, 1])
    })
    it('should calculate min', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(min(timeseries)).toEqual([2, 1])
        expect(min(timeseries, 0)).toEqual([0, 3])
    })
    it('should calculate avg', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(avg(timeseries)).toEqual(2)
    })
    it('should calculate sum', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(sum(timeseries)).toEqual(6)
    })
    it('head should return first elements', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(head(timeseries, 1)).toEqual({
            values: [[2, 1]]
        })
    })
    it('tail should return last elements', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [2, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [0, 3]);
        expect(tail(timeseries, 1)).toEqual({
            values: [[0, 3]]
        })
    })
    it('granularity should average buckets', () => {
        let timeseries: Timeseries = newTimeseries();
        update(timeseries, [0, 1]);
        update(timeseries, [1, 2]);
        update(timeseries, [2, 3]);
        update(timeseries, [3, 4]);
        update(timeseries, [4, 5]);
        update(timeseries, [5, 6]);
        update(timeseries, [6, 7]);
        expect(granularity(timeseries, 2)).toEqual({
            values: [
                [0, 1.5],
                [2, 3.5],
                [4, 5.5],
                [6, 7],
            ]
        })
        expect(granularity(timeseries, 4)).toEqual({
            values: [
                [0, 2.5],
                [4, 6],
            ]
        })
    })
    it('should handle delta timeserieses', () => {
        let timeseries: DeltaTimeseries = newTimeseries();
        updateDelta(timeseries, [2, 1]);
        updateDelta(timeseries, [1, 2]);
        updateDelta(timeseries, [0, 0]);
        expect(max(timeseries)).toEqual([1, 1]);
        expect(min(timeseries)).toEqual([0, -2]);
    })
    it('should handle non-negative delta timeserieses', () => {
        let timeseries: DeltaTimeseries = newTimeseries();
        updateNonNegativeDelta(timeseries, [2, 1]);
        updateNonNegativeDelta(timeseries, [1, 2]);
        updateNonNegativeDelta(timeseries, [0, 0]);
        console.log(timeseries);
        expect(max(timeseries)).toEqual([1, 1]);
        expect(min(timeseries)).toEqual([2, 0]);
    })
})