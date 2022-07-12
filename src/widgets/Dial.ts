import { ConfiguredWidget } from "../Widget";
import { viz } from "../Viz";

export interface DialConfig {
    label: string,
    textStyle: TextStyle,
    foregroundStyle: PolyStyle,
    backgroundStyle: PolyStyle,
}

export interface DialData {
    value: number
}

export const Dial = ConfiguredWidget<DialData, DialConfig>({
    label: '',
    textStyle: { font: '0.85', },
    foregroundStyle: {
        stroke: 'white',
        strokeWidth: 1,
    },
    backgroundStyle: {
        stroke: '#333333',
        strokeWidth: 1,
    },
}, ({ data, config, renderConfig }) => {
    let { height, width, pos } = renderConfig;
    let { value } = data;

    value = Math.max(0, Math.min(1, value)); // Constrain between 0 and 1

    // Display constants labels
    const RESOLUTION = 16;
    const RANGE = 1.2 * Math.PI;
    const START_ANGLE = (3 * Math.PI - RANGE) / 2;
    const background_increment = RANGE / (RESOLUTION - 1);
    const increment = (RANGE * value) / (RESOLUTION - 1);

    const radius = Math.min(width * (1 / 3), height * (1 / 2));
    const offsetX = pos.x + (width * (1 / 2));
    const offsetY = pos.y + (height + radius / 2) * (1 / 2)

    const background: [number, number][] = [];
    for (let i = 0; i < RESOLUTION; i++) {
        background.push([
            (Math.cos(i * background_increment + START_ANGLE) * radius) + offsetX,
            (Math.sin(i * background_increment + START_ANGLE) * radius) + offsetY,
        ])
    }

    const points: [number, number][] = [];
    for (let i = 0; i < RESOLUTION; i++) {
        points.push([
            (Math.cos(i * increment + START_ANGLE) * radius) + offsetX,
            (Math.sin(i * increment + START_ANGLE) * radius) + offsetY,
        ])
    }

    viz().poly(background, { ...config.backgroundStyle, strokeWidth: radius / 2 });
    viz().poly(points, { ...config.foregroundStyle, strokeWidth: radius / 2 });
    viz().text(config.label, offsetX, offsetY, { ...config.textStyle, align: 'center' });
})