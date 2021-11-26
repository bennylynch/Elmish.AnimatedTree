import { Record, Union } from "./fable_modules/fable-library.3.6.1/Types.js";
import { record_type, union_type, anonRecord_type, string_type, bool_type, int32_type, list_type } from "./fable_modules/fable-library.3.6.1/Reflection.js";
import { map, ofArray, singleton } from "./fable_modules/fable-library.3.6.1/List.js";
import * as react from "react";
import { Children, OnToggled, IsOpen as IsOpen_2, Content, Icon, Key, animatedTree } from "../src/AnimatedTree.fs.js";
import { map as map_1, delay, toList } from "./fable_modules/fable-library.3.6.1/Seq.js";
import { ProgramModule_mkSimple, ProgramModule_withConsoleTrace, ProgramModule_run } from "./fable_modules/Fable.Elmish.3.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.3.0.1/react.fs.js";

export class FileItem extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Directory", "File"];
    }
}

export function FileItem$reflection() {
    return union_type("App.FileItem", [], FileItem, () => [[["Item", anonRecord_type(["Children", list_type(FileItem$reflection())], ["Id", int32_type], ["IsOpen", bool_type], ["Name", string_type])]], [["Item", anonRecord_type(["Id", int32_type], ["Name", string_type])]]]);
}

export class State extends Record {
    constructor(Files) {
        super();
        this.Files = Files;
    }
}

export function State$reflection() {
    return record_type("App.State", [], State, () => [["Files", list_type(FileItem$reflection())]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ToggleDirectory"];
    }
}

export function Msg$reflection() {
    return union_type("App.Msg", [], Msg, () => [[["Item", int32_type]]]);
}

export function init() {
    return new State(singleton(new FileItem(0, {
        Children: ofArray([new FileItem(1, {
            Id: 2,
            Name: "report.pdf",
        }), new FileItem(1, {
            Id: 3,
            Name: "image.png",
        }), new FileItem(0, {
            Children: singleton(new FileItem(1, {
                Id: 5,
                Name: "word.exe",
            })),
            Id: 4,
            IsOpen: false,
            Name: "Programs",
        })]),
        Id: 1,
        IsOpen: false,
        Name: "Documents",
    })));
}

export function toggleDirectoryOpened(id, _arg1) {
    let directory;
    if (_arg1.tag === 0) {
        if ((directory = _arg1.fields[0], directory.Id === id)) {
            const directory_1 = _arg1.fields[0];
            return new FileItem(0, {
                Children: directory_1.Children,
                Id: directory_1.Id,
                IsOpen: !directory_1.IsOpen,
                Name: directory_1.Name,
            });
        }
        else if (_arg1.tag === 0) {
            const directory_2 = _arg1.fields[0];
            return new FileItem(0, {
                Children: map((_arg1_1) => toggleDirectoryOpened(id, _arg1_1), directory_2.Children),
                Id: directory_2.Id,
                IsOpen: directory_2.IsOpen,
                Name: directory_2.Name,
            });
        }
        else {
            throw (new Error("Match failure"));
        }
    }
    else {
        const file = _arg1.fields[0];
        return new FileItem(1, file);
    }
}

export function update(msg, state) {
    const id = msg.fields[0] | 0;
    return new State(map((_arg1) => toggleDirectoryOpened(id, _arg1), state.Files));
}

export const fileIcon = react.createElement("i", {
    className: "fa fa-file",
});

export const openFolderIcon = react.createElement("i", {
    className: "fa fa-folder-open",
});

export const closedFolderIcon = react.createElement("i", {
    className: "fa fa-folder",
});

export function renderFile(dispatch, _arg1) {
    if (_arg1.tag === 0) {
        const directory = _arg1.fields[0];
        return animatedTree(ofArray([Key(directory.Id), Icon(directory.IsOpen ? openFolderIcon : closedFolderIcon), Content(directory.Name), IsOpen_2(directory.IsOpen), OnToggled((_arg1_1) => {
            dispatch(new Msg(0, directory.Id));
        }), Children(toList(delay(() => map_1((file_1) => renderFile(dispatch, file_1), directory.Children))))]));
    }
    else {
        const file = _arg1.fields[0];
        return animatedTree(ofArray([Key(file.Id), Icon(fileIcon), Content(file.Name)]));
    }
}

export function render(state, dispatch) {
    return react.createElement("div", {
        style: {
            padding: 20,
            color: "white",
            fill: "white",
            width: "300px",
        },
    }, ...toList(delay(() => map_1((file) => renderFile(dispatch, file), state.Files))));
}

ProgramModule_run(ProgramModule_withConsoleTrace(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, (msg, state) => update(msg, state), (state_1, dispatch) => render(state_1, dispatch)))));

