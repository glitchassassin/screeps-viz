import { Widget } from "./Widget";

export interface DashboardConfig {
    widgets: {
        pos: {x: number, y: number},
        width: number,
        height: number,
        widget: Widget
    }[]
}

const defaultConfig: DashboardConfig = {
    widgets: []
}

export function Dashboard(config: Partial<DashboardConfig>) {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    }
    return (args: Record<string, any> = {}) => {
        mergedConfig.widgets.forEach(widget => {
            widget.widget(widget.pos, widget.width, widget.height, args);
        })
    }
}