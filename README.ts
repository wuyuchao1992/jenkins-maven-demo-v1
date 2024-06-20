   if (parent) {
      // 转换JSHandle对象为ElementHandle对象
      const parentElement = parent.asElement();
      if (parentElement) {
        // 在父元素内查找下拉菜单并提取label值
        const labels = await parentElement.$$eval(".ev-dropdown__overlay label .ev-field__label", elements =>
          elements.map(element => element.textContent)
        );

        // 打印每个label的值
        labels.forEach(label => console.log(label));
      } else {
        console.error('未能将父元素转换为ElementHandle');
      }
    } else {
      console.error('未找到按钮的父元素');
    }
  } else {
    console.error('未找到按钮');
  }
