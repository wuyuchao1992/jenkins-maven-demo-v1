 if (ulDivHandle) {
    // 获取 div.ul.label 元素的 test-id 属性值
    const labels = await ulDivHandle.evaluate(ulDiv => {
      const labelElements = ulDiv.querySelectorAll('.label');
      return Array.from(labelElements).map(label => label.getAttribute('test-id'));
    });

    // 输出每个 test-id 的值
    console.log(labels);
  } else {
    console.error('Could not find the div.ul element.');
  }
