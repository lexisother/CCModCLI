#!/usr/bin/env node
import {Command} from "commander";
import init from "./commands/init.js";
import install from "./commands/install.js";
import list from "./commands/list.js";

let program = new Command();

program
    .name("ccmodcli")
    .description("CLI containing common CrossCode modding tools.")
    .version("0.0.1");

program.addCommand(list());
program.addCommand(init());
program.addCommand(install());

program.parse(process.argv);
