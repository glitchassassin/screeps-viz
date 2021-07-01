import { Widget, WidgetPropsGenerator } from "./Widget";

import { deepMerge } from "./utils/deepMerge";
import { setRoom } from "./Viz";

export interface DashboardWidget {
    pos: {x: number, y: number},
    width: number,
    height: number,
    widget: Widget
}
export interface DashboardConfig {
    room?: string
}

const defaultConfig: DashboardConfig = {}

export function Dashboard(params: {widgets: DashboardWidget[], config?: DashboardConfig}) {
    const { widgets, config } = params;
    const mergedConfig = config ? deepMerge(defaultConfig, config) : defaultConfig;
    
    setRoom(mergedConfig.room);

    widgets.forEach(widget => {
        widget.widget({
            pos: widget.pos, 
            width: widget.width, 
            height: widget.height
        });
    })
}