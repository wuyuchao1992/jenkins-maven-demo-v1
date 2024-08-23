async function addRowsBasedOnRules(rules: Rule[]) {
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const rowNumber = `row_${i}`;

        // Skip the row if the ruleValue is empty
        if (!rule.ruleValue) {
            console.log(`Skipping ${rule.fieldName} as the rule value is empty.`);
            continue;
        }

        // Click the + button to add a new row, if not the first row
        if (i > 0) {
            await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByRole('button').click();
        }

        // Click on the drop-down for the current row
        await this.page.getByTestId('DrawerContent').getByTestId(rowNumber).getByTestId('evTooltip').locator('div').nth(1).click();

        // Select the option based on the rule field name
        await this.page.getByText(rule.fieldName).click();

        // Further actions can be added here based on `rule.validationRuleType` or `rule.type` if needed
    }
}