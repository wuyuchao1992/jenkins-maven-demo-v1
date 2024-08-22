// 随机选择选项的方法
function getRandomOption(): string {
    const options = ['CCY', 'ENTITY', 'BUSINESS_LINE', 'CURVE_ID']; // 选项数组
    return options[Math.floor(Math.random() * options.length)];
}

async function addRows(count: number) {
    for (let i = 0; i < count; i++) {
        const rowNumber = `row_${i}`;

        // 点击 +号 来新增一行
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByRole('button').click();

        // 点击新行的下拉框
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByTestId('evTooltip').locator('div').nth(1).click();

        // 调用方法获取随机选项
        const randomOption = getRandomOption();
        await this.page.getByText(randomOption).click();
    }
}

// 使用方法
await addRows(5);  // 这会新增5行，每行随机选择一个选项