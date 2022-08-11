import {Command} from "commander";
import {getStore} from "../lib/store/index.js";

type InstallOpts = {};
export default function () {
    return new Command("install")
        .description("Install a mod.")
        .argument("<mod>", "The mod to install.")
        .action(function (mod: string) {
            getStore();
        });
}
