import { deepMerge } from "./utils/deepMerge";

export interface RenderConfig {
    pos: {x: number, y: number},
    width: number,
    height: number
}
export type Widget = (props: RenderConfig) => void;

export type WidgetPropsGenerator<D, C> = () => {data: D, config?: Partial<C>};

export function ConfiguredWidget<DataType, ConfigType>(
    defaultConfig: ConfigType, 
    handler: (props: { data: DataType, config: ConfigType, renderConfig: RenderConfig }) => void
) {
    return (generator: WidgetPropsGenerator<DataType, ConfigType>|{data: DataType, config?: Partial<ConfigType>}): Widget => {
        return (props: RenderConfig) => {
            const { data, config } = (typeof generator === 'object') ? generator : generator();
            const mergedConfig = config ? deepMerge(defaultConfig, config) : defaultConfig;
            handler({
                data, 
                config: mergedConfig as ConfigType, 
                renderConfig: props
            });
        }
    }
}