import { BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

BeforeAll(() => {
    const screenshotDir = path.join(__dirname, '..', 'reports', 'screenshots');

    // 如果截图目录存在，删除其中的所有文件
    if (fs.existsSync(screenshotDir)) {
        fs.readdirSync(screenshotDir).forEach(file => {
            const filePath = path.join(screenshotDir, file);
            fs.unlinkSync(filePath);
        });
    }
});