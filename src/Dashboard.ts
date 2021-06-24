import { Widget } from "./Widget";
import { setRoom } from "./Viz";

export interface DashboardConfig {
    widgets: {
        pos: {x: number, y: number},
        width: number,
        height: number,
        widget: Widget
    }[],
    room?: string
}

const defaultConfig: DashboardConfig = {
    widgets: []
}

export function Dashboard(config: Partial<DashboardConfig>) {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    }
    setRoom(mergedConfig.room);
    
    return (args: Record<string, any> = {}) => {
        mergedConfig.widgets.forEach(widget => {
            widget.widget(widget.pos, widget.width, widget.height, args);
        })
    }
}