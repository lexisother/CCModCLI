import path from "path";

export const isWin = process.platform === "win32";
export const isMac = process.platform === "darwin";
export const isLinux = process.platform === "linux";

export function getDataDir(): string {
    // NOTE: These two are untested!!! {{{
    if (isWin) return "%LocalAppData/ccmodcli";
    else if (isMac) return "/Application Support/ccmodcli";
    // }}}
    else if (isLinux)
        return path.join(process.env.HOME, ".local/share/ccmodcli");
    return "";
}
