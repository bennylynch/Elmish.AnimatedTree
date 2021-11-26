import { Union } from "../demo/fable_modules/fable-library.3.6.1/Types.js";
import { union_type } from "../demo/fable_modules/fable-library.3.6.1/Reflection.js";
import { keyValueList } from "../demo/fable_modules/fable-library.3.6.1/MapUtil.js";
import { toArray, tryFind, filter } from "../demo/fable_modules/fable-library.3.6.1/List.js";
import { getEnumerator, equals } from "../demo/fable_modules/fable-library.3.6.1/Util.js";
import { createElement as createElement_1 } from "react";
import animated_tree from "./animated-tree.js";

class Keys extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["content", "type", "open", "canHide", "visible", "onClick", "children", "className", "style", "id", "toggled"];
    }
}

function Keys$reflection() {
    return union_type("AnimatedTree.Keys", [], Keys, () => [[], [], [], [], [], [], [], [], [], [], []]);
}

export function Content(content) {
    return [new Keys(0), content];
}

export function Icon(value) {
    return [new Keys(1), value];
}

export function IsOpen(condition) {
    return [new Keys(2), condition];
}

export function CanHide(condition) {
    return [new Keys(3), condition];
}

export function IsVisible(condition) {
    return [new Keys(4), condition];
}

export function EyeClicked(handler) {
    return [new Keys(5), handler];
}

export function Children(children) {
    return [new Keys(6), children];
}

export function Key(n) {
    return ["key", n];
}

export function Class(className) {
    return [new Keys(7), className];
}

export function Style(styles) {
    return [new Keys(8), keyValueList(styles, 1)];
}

export function Id(id) {
    return [new Keys(9), id];
}

export function OnToggled(handler) {
    return [new Keys(10), handler];
}

function buildConfig(props) {
    const config = {};
    const modified = filter((tupledArg) => {
        const key = tupledArg[0];
        return !equals(key, new Keys(6));
    }, props);
    const enumerator = getEnumerator(modified);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const value = forLoopVar[1];
            const key_1 = forLoopVar[0];
            config[key_1] = value;
        }
    }
    finally {
        enumerator.Dispose();
    }
    return config;
}

const createElement = createElement_1;

const nativeAnimatedTree = animated_tree;

export function animatedTree(props) {
    const _arg1_1 = tryFind((tupledArg) => {
        const key = tupledArg[0];
        return equals(key, new Keys(6));
    }, props);
    if (_arg1_1 != null) {
        const children = _arg1_1[1];
        const config_1 = buildConfig(props);
        return createElement(nativeAnimatedTree, config_1, toArray(children));
    }
    else {
        const config = buildConfig(props);
        return createElement(nativeAnimatedTree, config, null);
    }
}

