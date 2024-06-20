if (ulDivHandle) {
  // 获取 div.ul.label 元素的 test-id 属性值
  const labels = await ulDivHandle.evaluate(ulDiv => {
    if (!ulDiv) {
      return []; // 如果 ulDiv 为 null，则返回空数组
    }
    const labelElements = ulDiv.querySelectorAll('.label');
    return Array.from(labelElements).map(label => label.getAttribute('test-id'));
  });
  console.log(labels);
} else {
  console.error('Could not find the div.ul element.');
}
