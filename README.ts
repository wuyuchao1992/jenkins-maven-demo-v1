

  // 找到带有特定 test-id 的按钮
  const button = await page.waitForSelector('button[test-id="1"]');

  // 点击按钮以显示下拉列表（如果需要）
  await button.click();

  // 根据按钮定位到相关的 div.ul 元素
  const ulDiv = await button.evaluateHandle(button => {
    // 在 button 的祖先元素中找到相应的 div.ul
    return button.closest('some-parent-selector').querySelector('div.ul');
  });

  // 获取 div.ul.label 元素的 test-id 属性值
  const labels = await ulDiv.$$eval('.label', labels => {
    return labels.map(label => label.getAttribute('test-id'));
  });

  // 输出每个 test-id 的值
  console.log(labels);

  // 关闭浏览器
  await browser.close();
})();
