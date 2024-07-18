
// 函数处理键值对
function processKeyValuePairs(fields: { [key: string]: any }, defaultValue: any = null) {
  Object.keys(fields).forEach(key => {
    const value = (Object.keys(fields[key]).length === 0 && fields[key].constructor === Object) ? defaultValue : fields[key];
    set(obj, key, value);
  });
}
