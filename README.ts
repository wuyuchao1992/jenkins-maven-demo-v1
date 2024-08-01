import axios from 'axios';

async function retryPostOperation(url: string, data: any, retries: number, delay: number): Promise<void> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(url, data);
            if (response.status === 202) {
                console.log('Operation succeeded with status code 202');
                return;
            } else {
                console.log(`Unexpected status code ${response.status}, retrying...`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    console.error('Received status code 429: Too Many Requests, retrying...');
                } else if (error.code === 'ECONNRESET') {
                    console.error('Error: socket hang up, retrying...');
                } else {
                    console.error(`Request failed: ${error.message}, retrying...`);
                }
            } else {
                console.error(`Unexpected error: ${error}, retrying...`);
            }
        }
        await new Promise(res => setTimeout(res, delay));
    }
    throw new Error('Operation failed after maximum retries');
}

(async () => {
    const url = 'https://example.com/api';
    const data = { key: 'value' };

    try {
        await retryPostOperation(url, data, 10, 30000);
    } catch (error) {
        console.error('Operation failed after 10 retries:', error);
    }
})();
