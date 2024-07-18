function processKeyValuePairs(fields: { [key: string]: any }) {
  Object.keys(fields).forEach(key => {
    // 如果字段是一个空对象，则设置为空字符串
    if (Object.keys(fields[key]).length === 0 && fields[key].constructor === Object) {
      set(obj, key, '');
    } else {
      set(obj, key, fields[key]);
    }
  });
}
