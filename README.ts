import { BeforeAll } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

BeforeAll(() => {
    const screenshotDir = path.join(__dirname, '..', 'reports', 'screenshots');
    
    // 检查截图目录是否存在
    if (fs.existsSync(screenshotDir)) {
        // 读取目录中的所有文件并删除
        fs.readdirSync(screenshotDir).forEach(file => {
            const filePath = path.join(screenshotDir, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        });
        console.log(`Cleared screenshots from: ${screenshotDir}`);
    } else {
        // 如果目录不存在，则创建它
        fs.mkdirSync(screenshotDir, { recursive: true });
        console.log(`Created directory for screenshots: ${screenshotDir}`);
    }
});
