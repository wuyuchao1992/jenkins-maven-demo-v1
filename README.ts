import { Client } from 'pg';

// Function to create a new database client and connect to the database
async function createDbClient() {
    const client = new Client({
        user: 'your_db_user',
        host: 'your_db_host',
        database: 'your_db_name',
        password: 'your_db_password',
        port: 5432, // Default port for PostgreSQL
    });

    await client.connect();
    return client;
}

// Function to check file status from the database
async function checkFileStatus(fileId: string): Promise<string> {
    const client = await createDbClient();

    try {
        const res = await client.query('SELECT status FROM files WHERE id = $1', [fileId]);
        if (res.rows.length > 0) {
            return res.rows[0].status;
        } else {
            throw new Error('File not found');
        }
    } finally {
        await client.end();
    }
}

// Function to verify file status with retries
async function verifyFileStatus(fileId: string, maxAttempts: number, interval: number) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const status = await checkFileStatus(fileId);
            console.log(`Attempt ${attempts}: File status is ${status}`);

            if (status === "complete") {
                console.log("File is complete!");
                return;
            }
        } catch (error) {
            console.error(`Attempt ${attempts}: Error checking file status - ${error.message}`);
        }

        // Wait for the specified interval before the next attempt
        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error("File status did not become complete within the allowed attempts.");
}

// Use the function with a sample fileId
verifyFileStatus('sample-file-id', 5, 5000)
    .then(() => console.log("File status verification succeeded."))
    .catch((error) => console.error(error.message));
