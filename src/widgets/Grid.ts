import { Widget } from "../Widget";

export interface GridConfig {
    padding: number,
    rows: number,
    columns: number,
}

const defaultConfig: GridConfig = {
    padding: 1,
    rows: 2,
    columns: 2,
}

/**
 * A simple grid that splits space evenly between widgets. If more widgets are provided than
 * will fit, the remaining widgets are silently ignored.
 */
export function Grid(widgets: Widget[], config: Partial<GridConfig> = {}): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        const { padding, rows, columns } = mergedConfig;

        const widgetHeight = (height - (padding * (rows - 1))) / rows;
        const widgetWidth = (width - (padding * (columns - 1))) / columns;
        
        for (let q = 0; q < columns; q++) {
            for (let r = 0; r < rows; r++) {
                if (!widgets[q + (r * columns)]) break;
                widgets[q + (r * columns)](
                    {
                        x: pos.x + (widgetWidth + padding) * q,
                        y: pos.y + (widgetHeight + padding) * r,
                    }, 
                    widgetWidth,
                    widgetHeight,
                    params
                )
            }
        }
    }
}