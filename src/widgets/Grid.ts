import { ConfiguredWidget, Widget } from "../Widget";

export interface GridConfig {
    padding: number,
    rows: number,
    columns: number,
}

/**
 * A simple grid that splits space evenly between widgets. If more widgets are provided than
 * will fit, the remaining widgets are silently ignored.
 */
export const Grid = ConfiguredWidget<Widget[], GridConfig>({
    padding: 1,
    rows: 2,
    columns: 2,
}, ({data: widgets, config, renderConfig}) => {
    const { padding, rows, columns } = config;
    const { height, width, pos } = renderConfig

    const widgetHeight = (height - (padding * (rows - 1))) / rows;
    const widgetWidth = (width - (padding * (columns - 1))) / columns;
    
    for (let q = 0; q < columns; q++) {
        for (let r = 0; r < rows; r++) {
            if (!widgets[q + (r * columns)]) break;
            widgets[q + (r * columns)]({
                pos: {
                    x: pos.x + (widgetWidth + padding) * q,
                    y: pos.y + (widgetHeight + padding) * r,
                }, 
                width: widgetWidth,
                height: widgetHeight,
            })
        }
    }
})