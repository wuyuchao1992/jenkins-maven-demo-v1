const parent = await button.evaluateHandle(button => button.parentElement);
    if (parent) {
      // 在父元素内查找 .ev-dropdown__overlay 元素
      const dropdownOverlay = await parent.asElement().$('.ev-dropdown__overlay');
      if (dropdownOverlay) {
        // 提取下拉菜单中的 label 值
        const labels = await dropdownOverlay.$$eval("label .ev-field__label", elements =>
          elements.map(element => element.textContent.trim())
        );

        // 打印每个 label 的值
        labels.forEach(label => console.log(label));
      } else {
        console.error('未找到下拉菜单');
      }
    } else {
      console.error('未找到按钮的父元素');
    }
  } else {
    console.error('未找到按钮');
  }
