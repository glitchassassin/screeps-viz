import { Bar } from "./widgets/Bar";
import { Dashboard } from "./Dashboard";
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
                width: 5,
                height: 10,
                widget: Rectangle(
                    {}, 
                    Bar(
                        {
                            label: 'Bar',
                            style: {
                                fill: 'rgba(255,0,0,0.3)',
                                stroke: 'rgba(255,0,0,0.7'
                            }
                        },
                        () => ({ value: 10, maxValue: 20, targetValue: 15 })
                    )
                )
            },
            {
                pos: {
                    x: 7,
                    y: 1
                },
                width: 10,
                height: 10,
                widget: Rectangle(
                    {}, 
                    Table(
                        {
                            label: 'Table',
                            headers: ['header1', 'header2']
                        },
                        () => ([
                            ['value1', 'value2'],
                            ['value3', 'value4'],
                            ['value5', 'value6'],
                        ])
                    )
                )
            },
        ]
    });

    dashboard();
}