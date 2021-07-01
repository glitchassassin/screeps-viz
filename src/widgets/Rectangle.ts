import { ConfiguredWidget, Widget } from "../Widget";

import { viz } from "../Viz";

export interface RectangleConfig {
    padding: number,
    style: PolyStyle
}

export const Rectangle = ConfiguredWidget<Widget, RectangleConfig>({
    padding: 1,
    style: {
        fill: 'black',
        stroke: 'white',
        opacity: 0.3,
        lineStyle: 'solid'
    }
}, ({data, config, renderConfig}) => {
    const { padding, style } = config;
    const { pos, width, height} = renderConfig;
    viz().rect(pos.x, pos.y, width, height, style);

    data({
        pos: {
            x: pos.x + padding,
            y: pos.y + padding,
        }, 
        width: width - (2 * padding), 
        height: height - (2 * padding)
    });
});