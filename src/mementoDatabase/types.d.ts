type Library = {
    /** Create new Entry in library */
    create: (values?: Record<string, unknown>) => Entry;
    /** Find Entry by unique name*/
    findByKey: (name: string) => Entry;
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
    name: string;
    set: (name: string, value: any) => void;
};
