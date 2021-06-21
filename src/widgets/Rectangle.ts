import { Widget } from "../Widget";
import { viz } from "../Viz";

export interface RectangleConfig {
    padding: number,
    style: PolyStyle
}

const defaultConfig: RectangleConfig = {
    padding: 1,
    style: {
        fill: 'black',
        stroke: 'white',
        opacity: 0.3,
        lineStyle: 'solid'
    }
}

export function Rectangle(config: Partial<RectangleConfig>, widget: Widget): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        const { padding, style } = mergedConfig;
        viz.rect(pos.x, pos.y, width, height, style);
        widget(
            {
                x: pos.x + padding,
                y: pos.y + padding,
            }, 
            width - (2 * padding), 
            height - (2 * padding), 
            params
        );
    }
}