import {existsSync, mkdirSync} from "fs";
import path from "path";
import {getDataDir} from "../index.js";

export const storePath = () => {
    let sPath = path.join(getDataDir(), "store");
    if (!existsSync(sPath))
        mkdirSync(sPath, {
            recursive: true
        });
    return sPath;
};
export const storeJsonPath = path.join(getDataDir(), "stores.json");

export type ModStoreEntry = {
    id: string;
    version: string;
    path: string;
};
export type ModStore = {
    id: string;
    path: string;
    entries: ModStoreEntry[];
};
export type Stores = {
    stores: ModStore[];
};
