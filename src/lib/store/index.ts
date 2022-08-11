import {existsSync, readFileSync, writeFileSync} from "fs";
import path from "path";
import {storeJsonPath, storePath, Stores} from "./constants.js";

export function getStore(): Stores {
    if (!existsSync(storeJsonPath))
        writeFileSync(
            storeJsonPath,
            `{"stores": [{"id": "default", path": "${storePath()}","entries": []}]}`
        );
    return JSON.parse(readFileSync(storeJsonPath).toString());
}

// TODO: Check for duplicate entries by their ID
export function addEntry(
    id: string,
    version: string,
    storeId: string = "default"
) {
    let storesJson = getStore();
    let store = storesJson.stores.find((s) => s.id === storeId);
    let entry = {
        id,
        version,
        path: path.join(storePath(), id)
    };
    store.entries.push(entry);

    return entry;
}
