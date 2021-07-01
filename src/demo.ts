import { Timeseries, newTimeseries, update } from "metrics/Timeseries";

import { Bar } from "./widgets/Bar";
import { Dashboard } from "./Dashboard";
import { Grid } from "./widgets/Grid";
import { Label } from "./widgets/Label";
import { LineChart } from "./widgets/LineChart/LineChart";
import { Rectangle } from "./widgets/Rectangle";
import { Table } from "./widgets/Table";

declare global {
    interface Memory {
        timeseries1: Timeseries
        timeseries2: Timeseries
    }
}

Memory.timeseries1 ??= newTimeseries();
Memory.timeseries2 ??= newTimeseries();

export function loop() {
    update(Memory.timeseries1, Math.random() * 10, 20);
    update(Memory.timeseries2, Math.random() * 10, 20);
    Dashboard({
        widgets: [
            {
                pos: {
                    x: 1,
                    y: 1
                },
                width: 10,
                height: 20,
                widget: Rectangle({ 
                    data: Grid({
                        data: [
                            Bar(() => ({
                                data: { value: 10, maxValue: 20 },
                                config: {
                                    label: 'Bar 1',
                                    style: {
                                        fill: 'rgba(255,0,0,0.3)',
                                        stroke: 'rgba(255,0,0,0.7'
                                    }
                                },
                            })),
                            Bar(() => ({
                                data: { value: 5, maxValue: 20, targetValue: 15 },
                                config: {
                                    label: 'Bar 2',
                                    style: {
                                        fill: 'rgba(0,255,0,0.3)',
                                        stroke: 'rgba(0,255,0,0.7'
                                    }
                                },
                            })),
                            Bar(() => ({
                                data: { value: 10 },
                                config: {
                                    label: 'Bar 3',
                                    style: {
                                        fill: 'rgba(255,255,0,0.3)',
                                        stroke: 'rgba(255,255,0,0.7'
                                    }
                                },
                            })),
                            Bar(() => ({
                                data: { value: 9, maxValue: 10 },
                                config: {
                                    label: 'Bar 4',
                                },
                            })),
                        ],
                        config: { columns: 2, rows: 2 }, 
                    })
                })
            },
            {
                pos: {
                    x: 11,
                    y: 1
                },
                width: 10,
                height: 10,
                widget: Rectangle({
                    data: Table(() => ({
                        data: [
                            ['value1', 'value2'],
                            ['value3', 'value4'],
                            ['value5', 'value6'],
                        ],
                        config: {
                            label: 'Table',
                            headers: ['header1', 'header2']
                        }
                    }))
                })
            },
            {
                pos: {
                    x: 11,
                    y: 11
                },
                width: 20,
                height: 10,
                widget: Rectangle({
                    data: LineChart(() => ({
                        data: {
                            series1: Memory.timeseries1,
                            series2: Memory.timeseries2,
                        },
                        config: {
                            scale: {
                                y: {
                                    min: 0,
                                    max: 10
                                }
                            },
                            series: {
                                series1: {
                                    label: 'Series 1',
                                    color: 'lime',
                                },
                                series2: {
                                    label: 'Series 2',
                                    color: 'aqua'
                                },
                            }
                        }
                    }))
                })
            },
            {
                pos: {
                    x: 25,
                    y: 3
                },
                width: 20,
                height: 5,
                widget: Rectangle({
                    data: Label({
                        data: 'screeps-viz', 
                        config: {style: {font: 1.4}}
                    })
                })
            }
        ]
    });
}