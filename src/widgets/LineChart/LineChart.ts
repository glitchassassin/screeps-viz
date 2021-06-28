import { calculateScaleFromSeries, chartSpaceToRoomPosition, scaleToChartSpace } from "./ChartCalculations";

import { Timeseries } from "metrics/Timeseries";
import { Widget } from "../../Widget";
import { viz } from "../../Viz";

export interface LineChartSeriesConfig {
    label: string,
    color?: string,
}

export interface LineChartConfig {
    label: string,
    style: PolyStyle,
    series: Record<string, LineChartSeriesConfig>,
    scale?: {
        x?: {
            min?: number,
            max?: number
        },
        y?: {
            min?: number,
            max?: number
        }
    },
}

export type LineChartSeriesData = Record<string, Timeseries|[number, number][]>

const defaultConfig: LineChartConfig = {
    label: '',
    style: {
        fill: 'black',
        stroke: 'white',
        lineStyle: 'solid',
        opacity: 0.7
    },
    series: { }
}

const randomWebColor = () => (
    ['red', 'yellow', 'lime', 'green', 'aqua', 'teal', 'blue', 'fuchsia', 'purple'][Math.round(Math.random() * 9)]
)


/**
 * A simple line chart that can plot multiple series.
 */
export function LineChart(data: (params: Record<string, any>) => LineChartSeriesData, config: Partial<LineChartConfig> = {}): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        let chartSeriesData = data(params);
        let series = Object.keys(chartSeriesData).sort();

        // Draw labels
        let center = pos.x + width / 2;
        viz().text(mergedConfig.label, center, pos.y + height);

        // Draw Chart, scaled
        viz().rect(pos.x + 1, pos.y, width - 1, height - 1, mergedConfig.style);

        // Calculate bounds of chart
        const calculatedScale = calculateScaleFromSeries(chartSeriesData);
        const mergedScale = {
            x: {
                min: config.scale?.x?.min ?? calculatedScale.x.min,
                max: config.scale?.x?.max ?? calculatedScale.x.max,
            },
            y: {
                min: config.scale?.y?.min ?? calculatedScale.y.min,
                max: config.scale?.y?.max ?? calculatedScale.y.max,
            }
        }

        // Display axes and labels, if configured
        const labelCount = series.length;
        series.forEach((s, index) => {
            // Generate series config, if needed
            mergedConfig.series[s] ??= {
                label: s,
            }
            mergedConfig.series[s].color ??= randomWebColor();

            // Draw label
            const labelWidth = ((width - 6) / labelCount);
            const offset = 3 + labelWidth * (index + 0.5);
            viz().text(
                mergedConfig.series[s].label, 
                pos.x + offset, 
                pos.y + height, 
                {
                    color: mergedConfig.series[s].color,
                }
            );
        })

        viz().text(
            mergedScale.x.min.toFixed(0),
            pos.x + 1.5,
            pos.y + height
        )
        viz().text(
            mergedScale.x.max.toFixed(0),
            pos.x + width - 0.5,
            pos.y + height
        )
        viz().text(
            mergedScale.y.min.toFixed(0),
            pos.x,
            pos.y + height - 1
        )
        viz().text(
            mergedScale.y.max.toFixed(0),
            pos.x,
            pos.y + 0.5
        )

        // Display lines
        series.forEach(seriesName => {
            const s = chartSeriesData[seriesName];
            const data = Array.isArray(s) ? s : s.values;
            viz().poly(data.map(coords => 
                chartSpaceToRoomPosition(
                    pos.x + 1, 
                    pos.y,
                    width - 1,
                    height - 1,
                    scaleToChartSpace(mergedScale, coords)
                )
            ), {
                strokeWidth: 0.1,
                stroke: mergedConfig.series[seriesName].color,
                opacity: 1
            });
        });
    };
}