import { calculateScaleFromSeries, chartSpaceToRoomPosition, scaleToChartSpace } from "./ChartCalculations";

import { Widget } from "../../Widget";
import { viz } from "../../Viz";

export interface LineChartSeriesConfig {
    label: string,
    color?: string,
    style?: 'dotted' | 'dashed' | 'solid'
}

export interface LineChartConfig {
    label: string,
    style: PolyStyle,
    series: Record<string, LineChartSeriesConfig>,
    scale?: {
        x: {
            min: number,
            max: number
        },
        y: {
            min: number,
            max: number
        }
    },
}

export type LineChartSeriesData = Record<string, [number, number][]>

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
        if (!config.scale) {
            mergedConfig.scale = calculateScaleFromSeries(chartSeriesData);
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
            mergedConfig.scale?.x.min.toFixed(0) ?? '',
            pos.x + 1.5,
            pos.y + height
        )
        viz().text(
            mergedConfig.scale?.x.max.toFixed() ?? '',
            pos.x + width - 0.5,
            pos.y + height
        )
        viz().text(
            mergedConfig.scale?.y.min.toFixed(0) ?? '',
            pos.x,
            pos.y + height - 1
        )
        viz().text(
            mergedConfig.scale?.y.max.toFixed(0) ?? '',
            pos.x,
            pos.y + 0.5
        )

        // Display lines
        series.forEach(s => {
            viz().poly(chartSeriesData[s].map(coords => 
                chartSpaceToRoomPosition(
                    pos.x + 1, 
                    pos.y,
                    width - 1,
                    height - 1,
                    scaleToChartSpace(mergedConfig.scale!, coords)
                )
            ), {
                strokeWidth: 0.1,
                stroke: mergedConfig.series[s].color
            });
        });
    };
}