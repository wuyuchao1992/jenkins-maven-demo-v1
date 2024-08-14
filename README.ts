
import { BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

BeforeAll(() => {
    const screenshotDir = path.join(__dirname, '..', 'reports', 'screenshots');
    
    try {
        // 删除整个目录
        if (fs.existsSync(screenshotDir)) {
            fs.rmSync(screenshotDir, { recursive: true, force: true });
            console.log(`Deleted directory: ${screenshotDir}`);
        }

        // 重新创建目录
        fs.mkdirSync(screenshotDir, { recursive: true });
        console.log(`Created directory: ${screenshotDir}`);
    } catch (error) {
        console.error(`Error handling screenshots directory: ${error}`);
    }
});