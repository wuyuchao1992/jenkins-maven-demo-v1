let values = [1.00, 0.25, 1.50, 2.75];

for (let value of values) {
    console.log(value);
}


import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

    const tag = scenario.pickle.tags.find(tag => /^@TEST/.test(tag.name));
    if (tag) {
        // 提取标签的后缀部分
        const match = tag.name.match(/^@TEST-(\d+)$/);
        if (match) {
            tagSuffix = match[1];
        }
    }
});
