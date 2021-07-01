import { ConfiguredWidget, Widget, WidgetPropsGenerator } from "../Widget";

import { deepMerge } from "utils/deepMerge";
import { viz } from "../Viz";

export interface LabelConfig {
    style: TextStyle
}

export const Label = ConfiguredWidget<string, LabelConfig>({
    style: {
        color: 'white',
        align: 'center'
    }
}, ({data, config, renderConfig}) => {
    // Draw labels
    const { pos, height, width } = renderConfig
    const fontSize = (config.style.font ?? 0.7);
    const baseline = typeof fontSize === 'number' ? fontSize / 3 : 0.25
    let x;
    let y;
    if (config.style.align === 'left') {
        x = pos.x;
        y = pos.y + height / 2 + baseline;
    } else if (config.style.align === 'right') {
        x = pos.x + width;
        y = pos.y + height / 2 + baseline;
    } else {
        x = pos.x + width / 2;
        y = pos.y + height / 2 + baseline;
    }
    viz().text(data, x, y, config.style);
})