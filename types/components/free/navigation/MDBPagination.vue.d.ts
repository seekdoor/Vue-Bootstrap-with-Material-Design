declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    lg: {
        type: BooleanConstructor;
        default: boolean;
    };
    sm: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    lg: {
        type: BooleanConstructor;
        default: boolean;
    };
    sm: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    tag: string;
    circle: boolean;
    sm: boolean;
    lg: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
