declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    tabId: {
        type: StringConstructor;
        required: true;
    };
    href: StringConstructor;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    tabId: {
        type: StringConstructor;
        required: true;
    };
    href: StringConstructor;
}>>, {
    tag: string;
}, {}>, {
    default?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
