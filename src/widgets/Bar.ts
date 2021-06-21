import { Widget } from "../Widget";
import { viz } from "../Viz";

export interface BarConfig {
    label: string,
    style: PolyStyle
}

export interface BarData {
    value: number,
    targetValue?: number,
    maxValue?: number
}

const defaultConfig: BarConfig = {
    label: '',
    style: {
        fill: 'white',
        stroke: 'white',
        lineStyle: 'solid'
    }
}

export function Bar(config: Partial<BarConfig>, data: (params: Record<string, any>) => BarData): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        let { value, maxValue } = data(params);

        if (!maxValue) maxValue = value;

        const effectiveMax = Math.max(value, maxValue ?? 0);
        const valueHeight = Math.max(
            effectiveMax !== 0 ? (value / effectiveMax) * (height - 1) : 0,
            0.1
        );
        const maxValueHeight = Math.max(
            effectiveMax !== 0 ? (maxValue / effectiveMax) * (height - 1) : 0,
            0.1
        );

        // Draw labels
        let center = pos.x + width / 2;
        viz.text(mergedConfig.label, center, pos.y + height);
        viz.text(maxValue?.toFixed(0) ?? '', center, pos.y + 1);
        viz.text(value.toFixed(0), center, pos.y + height - 1.5);

        // Draw bar, scaled
        viz.rect(pos.x, pos.y + (height - maxValueHeight - 1), width, maxValueHeight, {...mergedConfig.style, fill: 'transparent'});
        viz.rect(pos.x, pos.y + (height - valueHeight - 1), width, valueHeight, {...mergedConfig.style, stroke: 'transparent'});
    };
}