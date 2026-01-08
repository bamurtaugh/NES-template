// Simple cloud storage service interface for testing
interface CloudStorageService {
    upload(fileName: string, data: string): Promise<string>;
    download(fileId: string): Promise<string>;
    delete(fileId: string): Promise<boolean>;
    listFiles(): Promise<string[]>;
}

class MockCloudStorage implements CloudStorageService {
    private storage: Map<string, string> = new Map();

    async upload(fileName: string, data: string): Promise<string> {
        const fileId = `${Date.now()}-${fileName}`;
        this.storage.set(fileId, data);
        return fileId;
    }

    async download(fileId: string): Promise<string> {
        const data = this.storage.get(fileId);
        if (!data) {
            throw new Error(`File not found: ${fileId}`);
        }
        return data;
    }

    async delete(fileId: string): Promise<boolean> {
        return this.storage.delete(fileId);
    }

    async listFiles(): Promise<string[]> {
        return Array.from(this.storage.keys());
    }
}

// Example usage
async function testCloudService() {
    const cloudService = new MockCloudStorage();
    
    // Upload a file
    const fileId = await cloudService.upload("test.txt", "Hello, Cloud!");
    console.log(`Uploaded file with ID: ${fileId}`);
    
    // Download the file
    const content = await cloudService.download(fileId);
    console.log(`Downloaded content: ${content}`);
    
    // List all files
    const files = await cloudService.listFiles();
    console.log(`Total files: ${files.length}`);
    
    // Delete the file
    const deleted = await cloudService.delete(fileId);
    console.log(`File deleted: ${deleted}`);
}

export { CloudStorageService, MockCloudStorage, testCloudService };
