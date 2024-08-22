async function addRows(options: string[]) {
    for (let i = 0; i < options.length; i++) {
        const rowNumber = `row_${i}`;

        // 点击 +号 来新增一行
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByRole('button').click();

        // 点击新行的下拉框
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByTestId('evTooltip').locator('div').nth(1).click();

        // 根据数组中的值选择特定的下拉框选项
        await this.page.getByText(options[i]).click();
    }
}

// 使用方法
await addRows(['CCY', 'ENTITY', 'BUSINESS_LINE', 'CURVE_ID']);  // 根据数组内容新增4行，每行分别选择对应的选项