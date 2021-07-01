import { ConfiguredWidget } from "../Widget";
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

export const Bar = ConfiguredWidget<BarData, BarConfig>({
    label: '',
    style: {
        fill: 'white',
        stroke: 'white',
        lineStyle: 'solid'
    }
}, ({data, config, renderConfig}) => {
    let { height, width, pos } = renderConfig;
    let { value, maxValue } = data;

    const effectiveMax = Math.max(value, maxValue ?? 0);
    const valueHeight = Math.max(
        effectiveMax !== 0 ? (value / effectiveMax) * (height - 1) : 0,
        0.1
    );
    const maxValueHeight = Math.max(
        effectiveMax !== 0 ? ((maxValue ?? value) / effectiveMax) * (height - 1) : 0,
        0.1
    );

    // Draw labels
    let center = pos.x + width / 2;
    viz().text(config.label, center, pos.y + height);
    viz().text(maxValue?.toFixed(0) ?? '', center, pos.y + 1);
    viz().text(value.toFixed(0), center, pos.y + height - 1.5);

    // Draw bar, scaled
    viz().rect(pos.x, pos.y + (height - maxValueHeight - 1), width, maxValueHeight, {...config.style, fill: 'transparent'});
    viz().rect(pos.x, pos.y + (height - valueHeight - 1), width, valueHeight, {...config.style, stroke: 'transparent'});
})