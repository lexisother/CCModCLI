import {Command} from "commander";
import ora from "ora";
import Table from "cli-table";
import {getContent, getModHomepageWebsiteName} from "../utils.js";
import {CCModDBPackage, NPDatabase} from "../types.js";

type ListOpts = {
    page: number;
};

export default function () {
    return new Command("list")
        .description("List the available mods.")
        .option("--page <number>", "The page of mods to show.")
        .action(async (options: ListOpts) => {
            if (!options.page) options.page = 1;

            let packages = [];
            let table = new Table({
                head: ["version", "name", "description", "link"]
            });
            let itemsPerPage = 5;

            let spinner = ora("Fetching mods...").start();
            let dbData = await getContent<NPDatabase>(
                "https://raw.githubusercontent.com/CCDirectLink/CCModDB/master/npDatabase.json",
                spinner
            );

            // Parser code here comes from https://github.com/CCDirectLink/ccbot/blob/a8c075cd52bc6d1b88b6a6e5f5a2c422c9d9646d/src/entities/mod-database.ts
            for (const id in dbData) {
                const pkg = dbData[id];
                const {metadata} = pkg;

                if (
                    metadata.ccmodType === "base" ||
                    metadata.ccmodType === "tool"
                )
                    continue;

                const isInstallable = pkg.installation.some(
                    (i) => i.type === "ccmod" || i.type === "modZip"
                );
                if (!isInstallable) continue;

                const pkg2 = [
                    metadata.version,
                    metadata.ccmodHumanName || metadata.name,
                    metadata.description || "No description.",
                    metadata.homepage || "No homepage."
                ];
                packages.push(pkg2);
            }

            packages = packages.slice(
                itemsPerPage * (options.page - 1),
                itemsPerPage * options.page
            );
            for (const i of packages) table.push(i);

            console.log(table.toString());
        });
}
