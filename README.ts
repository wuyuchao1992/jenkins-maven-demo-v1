import { Given } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';

interface Rule {
    fieldName: string;
    type: string;
    validationRuleType: string;
    ruleValue: string;
}

Given('I add rows based on the following rules', async function(dataTable: DataTable) {
    // Explicitly cast the output to match the expected type
    const rules: Rule[] = dataTable.hashes() as unknown as Rule[];

    // Call the method and pass the extracted rules
    await addRowsBasedOnRules.call(this, rules);
});