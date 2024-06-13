import { request } from 'undici';

// 定义一个异步函数，用于发送带有请求体的DELETE请求
async function deleteDataWithBody(url: string, body: Record<string, any>, timeout: number = 5000, retries: number = 3): Promise<void> {
    try {
        // 设置请求配置
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            connectTimeout: timeout, // 设置连接超时时间
        };

        // 发送请求
        const { statusCode, body: responseBody } = await request(url, options);

        // 检查响应状态码
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error(`HTTP error! Status: ${statusCode}`);
        }

        // 可选：处理响应数据
        const data = await responseBody.json();
        console.log('Response data:', data);
    } catch (error) {
        if (retries > 0) {
            console.error('Request failed, retrying...', retries, 'retries left');
            await new Promise(res => setTimeout(res, 1000)); // 延迟1秒后重试
            return deleteDataWithBody(url, body, timeout, retries - 1);
        } else {
            console.error('Error:', error);
        }
    }
}

// 调用deleteDataWithBody函数并传入URL和请求体
const url = 'https://api.example.com/item';
const body = {
    id: '123',
    type: 'example',
    reason: 'no longer needed'
};

deleteDataWithBody(url, body);
