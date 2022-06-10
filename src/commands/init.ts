import { existsSync as exists, writeFileSync } from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import { exec } from "child_process";

const prompts: inquirer.QuestionCollection = [
    {
        type: "input",
        name: "modId",
        message: "What is your mod's ID?",
        default: "mod-id"
    },
    {
        type: "input",
        name: "modName",
        message: "What is your mod's name?",
    },
    {
        type: "input",
        name: "modDescription",
        message: "What is your mod's description?",
    },
    {
        type: "input",
        name: "modVersion",
        message: "What is your mod's version number?",
        default: "0.0.1",
    },
]

type InitOpts = {
    typescript: boolean;
}
export default function() {
    return new Command("init")
        .description("Initialize a new mod.")
        .option("--typescript", "If the written mod template should be written in TypeScript.")
        .action(async (options: InitOpts) => {
            if (exists("./ccmod.json")) {
                console.log("A mod already exists in this directory!");
                return;
            }

            const answers = await inquirer.prompt(prompts);

            // Construct the resulting ccmod.json file.
            let ccmod = {
                id: answers.modId,
                version: answers.modVersion,
                name: answers.modName,
                description: answers.modDescription
            }
            writeFileSync("./ccmod.json", JSON.stringify(ccmod, null, 4));

            if (options.typescript) {
                let packageJson = {
                    name: answers.modId,
                    devDependencies: {
                        "@types/node": "^17.0.33",
                        "typescript": "^4.6.3",
                        "ultimate-crosscode-typedefs": "github:dmitmel/ultimate-crosscode-typedefs"
                    },
                    scripts: {
                        build: "tsc --build",
                        watch: "tsc --build --watch",
                    }
                }
                writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
                
                let spinner = ora("Installing dependencies...").start();
                exec("npm install", err => {
                    if (err) {
                        spinner.fail("Failed to install dependencies!");
                        console.error(err);
                    }

                    spinner.succeed("Installed dependencies!");
                });
            }
        });
}