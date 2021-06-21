import { Widget } from "../Widget";
import { viz } from "../Viz";

export interface TableConfig {
    label?: string,
    headers: string[],
}
export type TableData = any[][]

const defaultConfig: TableConfig = {
    headers: [],
}

export function Table(data: (params: Record<string, any>) => TableData, config: Partial<TableConfig> = {}): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        const { label, headers } = mergedConfig;
        const labelHeight = (label ? 1 : 0)
        let rows = data(params).slice(0, height - labelHeight);
        
        const columnWidths = headers.map((header, index) => {
            let width = Math.ceil(rows.reduce((maxWidth, row) => Math.max(header.length, maxWidth, row[index].toString().length), 0))
            return width;
        });
        const columnWidthSum = columnWidths.reduce((a, b) => (a + b), 0);
        const columnOffsets = [0, ...columnWidths.map(colWidth => (width * (colWidth / columnWidthSum)))];
        
        // Draw label
        if (label) {
            viz.text(label, (pos.x + width / 2), pos.y);
        }

        // Draw headers
        headers.forEach((header, index) => {
            viz.text(header, pos.x + columnOffsets[index], pos.y + labelHeight, {align: 'left'});
        })
        // Draw body
        rows.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                viz.text(cell, pos.x + columnOffsets[columnIndex], pos.y + 1 + labelHeight + rowIndex, {align: 'left'});
            })
        })
    }
}