export interface Timeseries {
    values: [number, number][]
}

export interface DeltaTimeseries {
    last?: number,
    values: [number, number][]
}

export interface NonNegativeDeltaTimeseries extends DeltaTimeseries {
    
}

export const newTimeseries = (): Timeseries => ({values: []})

export const min = (series: Timeseries, dimension = 1) => {
    return series.values.reduce((min, item) => {
        return (!min || item[dimension] < min[dimension]) ? item : min
    })
}

export const max = (series: Timeseries, dimension = 1) => {
    return series.values.reduce((max, item) => {
        return (!max || item[dimension] > max[dimension]) ? item : max
    })
}

export const sum = (series: Timeseries) => {
    return series.values.reduce((sum, item) => {
        return item[1] + sum
    }, 0)
}

export const head = (series: Timeseries, count: number): Timeseries => {
    return {
        ...series,
        values: series.values.slice(0, count)
    }
}

export const tail = (series: Timeseries, count: number): Timeseries => {
    return {
        ...series,
        values: series.values.slice(-count)
    }
}

export const granularity = (series: Timeseries, ticks: number): Timeseries => {
    const buckets = new Map<number, number[]>();
    series.values.forEach(([time, value]) => {
        const index = Math.floor(time / ticks) * ticks
        const bucket = buckets.get(index) ?? [];
        bucket.push(value);
        buckets.set(index, bucket)
    })
    return {
        ...series,
        values: [...buckets.entries()]
            .map(([time, values]) => [
                time, 
                values.reduce((a, b) => a + b, 0) / values.length
            ])
    }
}

export const avg = (series: Timeseries) => {
    return sum(series) / series.values.length;
}

export const last = (series: Timeseries) => {
    return series.values[series.values.length - 1]
}

const timestampValue = (value: number|[number, number]): [number, number] => {
    if (Array.isArray(value)) {
        return value;
    }
    return [Game.time, value];
}

export const update = (series: Timeseries, value: number|[number, number], limit?: number) => {
    series.values.push(timestampValue(value));
    while (limit !== undefined && series.values.length > limit) {
        series.values.shift();
    }
    return series;
}

export const updateDelta = (series: DeltaTimeseries, value: number|[number, number], limit?: number) => {
    let v = timestampValue(value);
    if (series.last === undefined || isNaN(series.last)) {
        series.last = v[1];
    }
    update(series, [v[0], v[1] - series.last], limit);
    series.last = v[1];
    return series;
}

export const updateNonNegativeDelta = (series: DeltaTimeseries, value: number|[number, number], limit?: number) => {
    let v = timestampValue(value);
    if (series.last === undefined || isNaN(series.last)) {
        series.last = v[1];
    }
    update(series, [v[0], Math.max(0, v[1] - series.last)], limit);
    series.last = v[1];
    return series;
}
