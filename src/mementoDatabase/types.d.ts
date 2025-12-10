type Library = {
    /** The name of the library */
    name: string;
    /** Alias for name */
    title: string;
    /** Get all entries in the library, sorted by creation time (newest first) */
    entries: () => Entry[];
};

type Entry = {
    id: string;
    field: (name: string) => any;
    set: (name: string, value: any) => void;
};
