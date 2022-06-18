export interface CCModDBPackagePage {
    name: string;
    url: string;
}
export interface CCModDBPackage {
    name: string;
    version: string;
    description?: string;
    page: CCModDBPackagePage[];
}

export interface NPDatabase {
    [id: string]: NPDatabasePackage;
}

export interface NPDatabasePackage {
    metadata: NPDatabasePackageMetadata;
    installation: NPDatabasePackageInstallation[];
}

export interface NPDatabasePackageMetadata {
    ccmodType?: "base" | "tool";
    ccmodHumanName: string;
    name: string;
    version: string;
    description?: string;
    homepage?: string;
}

export interface NPDatabasePackageInstallation {
    type: "modZip" | "ccmod";
    url: string;
}
