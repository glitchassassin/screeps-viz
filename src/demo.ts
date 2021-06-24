import { Bar } from "./widgets/Bar";
import { Dashboard } from "./Dashboard";
import { Grid } from "./widgets/Grid";
import { Label } from "./widgets/Label";
import { LineChart } from "./widgets/LineChart/LineChart";
import { Rectangle } from "./widgets/Rectangle";
import { Table } from "./widgets/Table";

const dashboard = Dashboard({
    widgets: [
        {
            pos: {
                x: 1,
                y: 1
            },
            width: 10,
            height: 20,
            widget: Rectangle(Grid(
                [
                    Bar(
                        () => ({ value: 10, maxValue: 20 }),
                        {
                            label: 'Bar 1',
                            style: {
                                fill: 'rgba(255,0,0,0.3)',
                                stroke: 'rgba(255,0,0,0.7'
                            }
                        },
                    ),
                    Bar(
                        () => ({ value: 5, maxValue: 20, targetValue: 15 }),
                        {
                            label: 'Bar 2',
                            style: {
                                fill: 'rgba(0,255,0,0.3)',
                                stroke: 'rgba(0,255,0,0.7'
                            }
                        },
                    ),
                    Bar(
                        () => ({ value: 10 }),
                        {
                            label: 'Bar 3',
                            style: {
                                fill: 'rgba(255,255,0,0.3)',
                                stroke: 'rgba(255,255,0,0.7'
                            }
                        },
                    ),
                    Bar(
                        () => ({ value: 9, maxValue: 10 }),
                        {
                            label: 'Bar 4'
                        },
                    ),
                ],
                { columns: 2, rows: 2 }, 
            ))
        },
        {
            pos: {
                x: 11,
                y: 1
            },
            width: 10,
            height: 10,
            widget: Rectangle(
                Table(
                    () => ([
                        ['value1', 'value2'],
                        ['value3', 'value4'],
                        ['value5', 'value6'],
                    ]),
                    {
                        label: 'Table',
                        headers: ['header1', 'header2']
                    },
                )
            )
        },
        {
            pos: {
                x: 11,
                y: 11
            },
            width: 20,
            height: 10,
            widget: Rectangle(
                LineChart(
                    () => ({
                        series1: [
                            [Game.time - 3, 0],
                            [Game.time - 2, 1],
                            [Game.time - 1, 1],
                            [Game.time - 0, 2],
                        ],
                        series2: [
                            [Game.time - 3, 0],
                            [Game.time - 2, 2],
                            [Game.time - 1, 1],
                            [Game.time - 0, 0],
                        ],
                    }),
                    {
                        series: {
                            series1: {
                                label: 'Series 1',
                                color: 'lime'
                            },
                            series2: {
                                label: 'Series 2',
                                color: 'aqua',
                                style: 'dashed'
                            },
                        }
                    }
                )
            )
        },
        {
            pos: {
                x: 25,
                y: 3
            },
            width: 20,
            height: 5,
            widget: Rectangle(
                Grid([
                    Label(() => 'screeps-viz', {style: {font: 1.4}}),
                    Label(() => 'Demo Dashboard', {style: {font: 1.4}}),
                ], { columns: 1, rows: 2 })
            )
        }
    ]
});

export function loop() {
    dashboard();
}