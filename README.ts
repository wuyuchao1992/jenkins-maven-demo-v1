  // 根据按钮定位到相关的 div.ul 元素
  const ulDivHandle = await button.evaluateHandle(button => {
    // 在 button 的祖先元素中找到相应的 div.ul
    return button.closest('some-parent-selector').querySelector('div.ul');
  });

  // 获取 div.ul.label 元素的 test-id 属性值
  const labels = await ulDivHandle.evaluate(ulDiv => {
    const labelElements = ulDiv.querySelectorAll('.label');
    return Array.from(labelElements).map(label => label.getAttribute('test-id'));
  });
