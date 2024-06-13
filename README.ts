// 定义一个异步函数，用于发送DELETE请求
async function deleteData(url: string): Promise<void> {
    try {
        // 使用fetch发送DELETE请求
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 可以根据需要添加其他HTTP头部信息
            },
        });

        // 检查响应状态码
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 可选：处理响应数据
        const data = await response.json();
        console.log('Response data:', data);
    } catch (error) {
        // 处理错误
        console.error('Error:', error);
    }
}

// 调用deleteData函数并传入URL
const url = 'https://api.example.com/item/123';
deleteData(url);
