function setMultipleFields(obj: any, fields: { [key: string]: any }) {
    Object.keys(fields).forEach(key => {
        set(obj, key, fields[key]);
    });
}
