// Function to check file status from an API with retry mechanism
async function checkFileStatus(fileId: string): Promise<string> {
    const maxRetries = 5;
    const retryInterval = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(`https://api.example.com/files/${fileId}`);

            if (response.status === 202) {
                return response.data.data; // Extracting the 'data' field from the response
            } else {
                console.log(`Attempt ${attempt}: Received status code ${response.status}`);
            }
        } catch (error) {
            console.error(`Attempt ${attempt}: Error checking file status: ${error.message}`);
        }

        if (attempt < maxRetries) {
            // Wait for the retry interval before the next attempt
            await new Promise((resolve) => setTimeout(resolve, retryInterval));
        } else {
            throw new Error(`Failed to retrieve file status after ${maxRetries} attempts.`);
        }
    }
}
