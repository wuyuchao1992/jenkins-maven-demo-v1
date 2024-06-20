  // 通过 data-testid 定位按钮元素
  const button = await page.$('button[data-testid="AssumptionManagement_SearchBar_refProxyRate"]');
  if (button) {
    // 获取按钮的父元素
    const parent = await button.evaluateHandle(button => button.parentElement);
    if (parent) {
      // 转换为 ElementHandle
      const parentElement = parent.asElement();
      if (parentElement) {
        // 在父元素内查找下拉菜单的 ul 元素
        const dropdown = await parentElement.$('.ev-dropdown__overlay ul.ev-list');
        if (dropdown) {
          // 提取下拉菜单中的 label 值
          const labels = await dropdown.$$eval("label .ev-field__label", elements =>
            elements.map(element => element.textContent.trim())
          );

          // 打印每个 label 的值
          labels.forEach(label => console.log(label));
        } else {
          console.error('未找到下拉菜单的 ul 元素');
        }
      } else {
        console.error('未能将父元素转换为 ElementHandle');
      }
    } else {
      console.error('未找到按钮的父元素');
    }
  } else {
    console.error('未找到按钮');
  }
