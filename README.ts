async function addRows(options: string[]) {
    const maxRows = 5; // 假设最大允许添加5行（包含已有的第一行）
    
    for (let i = 0; i < options.length; i++) {
        const rowNumber = `row_${i}`;
        
        // 除了最后一行，其他行都需要点击 +号 来新增
        if (i < options.length - 1 && i < maxRows - 1) {
            await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByRole('button').click();
        }

        // 点击新行的下拉框
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByTestId('evTooltip').locator('div').nth(1).click();

        // 根据数组中的值选择特定的下拉框选项
        await this.page.getByText(options[i]).click();
    }
}

// 使用方法
await addRows(['CCY', 'ENTITY', 'BUSINESS_LINE', 'CURVE_ID', 'ENTITY']);  // 根据数组内容新增5行，但最后一次不会点击 +号