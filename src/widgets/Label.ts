import { Widget } from "../Widget";
import { viz } from "../Viz";

export interface LabelConfig {
    style: TextStyle
}

const defaultConfig: LabelConfig = {
    style: {
        color: 'white',
        align: 'center'
    }
}

export function Label(data: (params: Record<string, any>) => string, config: Partial<LabelConfig> = {}): Widget {
    const mergedConfig = {
        ...defaultConfig,
        ...config
    };
    return (pos: {x: number, y: number}, width: number, height: number, params: Record<string, any>) => {
        // Draw labels
        const fontSize = (mergedConfig.style.font ?? 0.7);
        const baseline = typeof fontSize === 'number' ? fontSize / 3 : 0.25
        let x;
        let y;
        if (mergedConfig.style.align === 'left') {
            x = pos.x;
            y = pos.y + height / 2 + baseline;
        } else if (mergedConfig.style.align === 'right') {
            x = pos.x + width;
            y = pos.y + height / 2 + baseline;
        } else {
            x = pos.x + width / 2;
            y = pos.y + height / 2 + baseline;
        }
        viz().text(data(params), x, y, mergedConfig.style);
    };
}