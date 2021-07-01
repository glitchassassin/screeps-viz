import { ConfiguredWidget, Widget, WidgetPropsGenerator } from "../Widget";

import { deepMerge } from "../utils/deepMerge";
import { viz } from "../Viz";

export interface TableConfig {
    label?: string,
    headers: string[],
}
export type TableData = any[][]

export const Table = ConfiguredWidget<TableData, TableConfig>({
    headers: [],
}, ({data, config, renderConfig}) => {
    const { label, headers } = config;
    const { pos, height, width } = renderConfig;
    const labelHeight = (label ? 1 : 0)
    let rows = data.slice(0, height - labelHeight);
    
    const columnWidths = headers.map((header, index) => {
        let width = Math.max(
            header.length, 
            rows.reduce((maxWidth, row) => Math.max(maxWidth, row[index].toString().length), 0), 
            1
        );
        return width;
    });
    const columnWidthSum = columnWidths.reduce((a, b) => (a + b), 0);
    const columnOffsets = [0];
    columnWidths.forEach((colWidth, index) => {
        columnOffsets.push((width * (colWidth / columnWidthSum)) + columnOffsets[index]);
    });
    
    // Draw label
    if (label) {
        viz().text(label, (pos.x + width / 2), pos.y);
    }

    // Draw headers
    headers.forEach((header, index) => {
        viz().text(header, pos.x + columnOffsets[index], pos.y + labelHeight, {align: 'left'});
    })
    // Draw body
    rows.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            viz().text(cell, pos.x + columnOffsets[columnIndex], pos.y + 1 + labelHeight + rowIndex, {align: 'left'});
        })
    })
});