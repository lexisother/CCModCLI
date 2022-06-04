import {Ora} from "ora";
import {get} from "https";
import {CCModDBPackagePage} from "./types.js"


export function getContent<T>(url: string, spinner: Ora): Promise<T> {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            const {statusCode} = res;
            if (statusCode !== 200) {
                res.resume();
                spinner.fail(`Request failed. Status code: ${statusCode}`);
                reject(`Request failed. Status code: ${statusCode}`);
            }
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk: string) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                    spinner.succeed("Fetched mods!")
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    spinner.fail("Something went wrong! We don't know what, though...")
                    let errorMessage = "Something went wrong! We don't know what, though...";
                    if (e instanceof Error) {
                        errorMessage = e.message;
                    }
                    reject(`Error: ${errorMessage}`);
                }
            });
        }).on("error", (err: {message: any}) => {
            reject(`Error: ${err.message}`);
        });
    });
}

// copied from https://github.com/CCDirectLink/CCModDB/blob/f4b7caca87776465f2dcadc6a98a9d24f0935f98/build/src/db.ts#L84-L102
export function getModHomepageWebsiteName(url?: string): CCModDBPackagePage[] {
    if (!url) return [];

    let name: string;
    switch (new URL(url).hostname) {
        case 'github.com':
            name = 'GitHub';
            break;
        case 'gitlab.com':
            name = 'GitLab';
            break;
        default:
            name = 'mod\'s homepage';
    }

    return [{name, url}];
}