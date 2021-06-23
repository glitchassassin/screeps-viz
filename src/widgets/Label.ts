import { Widget } from "../Widget";
import { viz } from "../Viz";

export interface LabelConfig {
    style: PolyStyle
}

const defaultConfig: LabelConfig = {
    style: {
        fill: 'white',
        stroke: 'white',
        lineStyle: 'solid'
    }
}

export function Label(data: (params: Record<string, any>) => string, config: Partial<LabelConfig> = {}): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        // Draw labels
        let centerX = pos.x + width / 2;
        let centerY = pos.x + width / 2;
        viz.text(data(params), centerX, centerY, mergedConfig.style);
    };
}