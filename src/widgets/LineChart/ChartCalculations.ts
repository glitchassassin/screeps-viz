import { LineChartSeriesData } from "./LineChart";

export interface LineChartScale {
    x: {
        min: number,
        max: number,
    },
    y: {
        min: number,
        max: number,
    }, 
}

/**
 * Given a Record of series data, calculates the appropriate scale to contain all data
 */
export const calculateScaleFromSeries = (chartSeriesData: LineChartSeriesData): LineChartScale => {
    const initialScale = {
        x: { min: Infinity, max: -Infinity },
        y: { min: Infinity, max: -Infinity },
    };
    return Object.values(chartSeriesData).reduce((results, series) => {
        const data = Array.isArray(series) ? series : series.values;
        const seriesBounds = data.reduce((seriesResults, row) => {
            return {
                x: { 
                    min: Math.min(seriesResults.x.min, row[0]), 
                    max: Math.max(seriesResults.x.max, row[0]) 
                },
                y: {
                    min: Math.min(seriesResults.y.min, row[1]), 
                    max: Math.max(seriesResults.y.max, row[1]) 
                }
            }
        }, initialScale)
        return {
            x: {
                min: Math.min(seriesBounds.x.min, results.x.min),
                max: Math.max(seriesBounds.x.max, results.x.max),
            },
            y: {
                min: Math.min(seriesBounds.y.min, results.y.min),
                max: Math.max(seriesBounds.y.max, results.y.max),
            }
        }
    }, initialScale);
}

export const scaleToChartSpace = (scale: LineChartScale, coords: [number, number]) => {
    
    return {
        x: Math.min(1,
            Math.max(0, 
                (coords[0] - scale.x.min) / (scale.x.max - scale.x.min)
            )
        ),
        y: Math.min(1,
            Math.max(0, 
                (coords[1] - scale.y.min) / (scale.y.max - scale.y.min)
            )
        ),
    }
}

/**
 * (0,0) corresponds to the bottom left of chart space, but top left of room space
 */
export const chartSpaceToRoomPosition = (x: number, y: number, width: number, height: number, chartSpaceCoords: {x: number, y: number}): [number, number] => {
    return [
        x + width * chartSpaceCoords.x,
        y + height - (height * chartSpaceCoords.y)
    ]
}