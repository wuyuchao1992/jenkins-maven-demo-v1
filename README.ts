if (button) {
    // 找到按钮的父元素
    const parent = await button.evaluateHandle(button => button.parentElement);
    if (parent) {
      // 在父元素内查找下拉菜单并提取label值
      const labels = await parent.$$eval(".ev-dropdown__overlay label .ev-field__label", elements =>
        elements.map(element => element.textContent)
      );

      // 打印每个label的值
      labels.forEach(label => console.log(label));
    } else {
      console.error('未找到按钮的父元素');
    }
