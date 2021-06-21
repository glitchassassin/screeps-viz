import { Bar } from "./widgets/Bar";
import { Dashboard } from "./Dashboard";
import { Grid } from "./widgets/Grid";
import { Rectangle } from "./widgets/Rectangle";
import { Table } from "./widgets/Table";

export function loop() {
    const dashboard = Dashboard({
        widgets: [
            {
                pos: {
                    x: 1,
                    y: 1
                },
                width: 20,
                height: 10,
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
                    { columns: 4, rows: 1 }, 
                ))
            },
            {
                pos: {
                    x: 1,
                    y: 11
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
        ]
    });

    dashboard();
}