async function addRows(count: number) {
    for (let i = 0; i < count; i++) {
        const rowNumber = `row_${i}`;

        // 点击 +号 来新增一行
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByRole('button').click();

        // 点击新行的下拉框
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByTestId('evTooltip').locator('div').nth(1).click();

        // 选择特定的下拉框选项，例如 CCY
        await this.page.getByText('CCY').click();
    }
}

// 使用方法
await addRows(5);  // 这会新增5行