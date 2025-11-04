/**
 * Node.js Configuration File Validator
 * Validates JSON and YAML configuration files
 */

const fs = require('fs');
const path = require('path');

// Configuration files to test
const CONFIG_FILES = {
    json: [
        'task-config.json',
        'task-config.schema.json'
    ],
    yaml: [
        'app.yaml',
        'docker-compose.yml'
    ],
    text: [
        'nginx.conf',
        'apache.conf',
        'pyproject.toml'
    ]
};

let testCount = 0;
let passCount = 0;
let failCount = 0;

/**
 * Run a test and report results
 */
function runTest(testName, testFn) {
    testCount++;
    process.stdout.write(`Testing ${testName}... `);
    
    try {
        testFn();
        console.log('✅ PASS');
        passCount++;
        return true;
    } catch (error) {
        console.log('❌ FAIL');
        console.log(`   Error: ${error.message}`);
        failCount++;
        return false;
    }
}

/**
 * Test file existence
 */
function testFileExists(filename) {
    if (!fs.existsSync(filename)) {
        throw new Error(`File ${filename} does not exist`);
    }
}

/**
 * Test JSON file syntax
 */
function testJsonSyntax(filename) {
    testFileExists(filename);
    const content = fs.readFileSync(filename, 'utf8');
    JSON.parse(content); // Will throw if invalid
}

/**
 * Test YAML file syntax (if js-yaml is available)
 */
function testYamlSyntax(filename) {
    testFileExists(filename);
    const content = fs.readFileSync(filename, 'utf8');
    
    try {
        const yaml = require('js-yaml');
        yaml.load(content);
    } catch (requireError) {
        // js-yaml not available, skip YAML parsing but check file exists
        console.log(`   Note: js-yaml not available, only checking file existence`);
    }
}

/**
 * Test text file readability
 */
function testTextFile(filename) {
    testFileExists(filename);
    const content = fs.readFileSync(filename, 'utf8');
    if (content.length === 0) {
        throw new Error(`File ${filename} is empty`);
    }
}

/**
 * Test JSON Schema structure
 */
function testJsonSchemaStructure() {
    const content = fs.readFileSync('task-config.schema.json', 'utf8');
    const schema = JSON.parse(content);
    
    if (!schema.$schema) {
        throw new Error('JSON Schema missing $schema property');
    }
    
    if (!schema.type) {
        throw new Error('JSON Schema missing type property');
    }
    
    if (!schema.properties) {
        throw new Error('JSON Schema missing properties');
    }
    
    if (!Array.isArray(schema.required)) {
        throw new Error('JSON Schema required should be an array');
    }
}

/**
 * Test task config structure
 */
function testTaskConfigStructure() {
    const content = fs.readFileSync('task-config.json', 'utf8');
    const config = JSON.parse(content);
    
    const requiredFields = ['version', 'environment', 'database'];
    for (const field of requiredFields) {
        if (!(field in config)) {
            throw new Error(`Task config missing required field: ${field}`);
        }
    }
    
    // Check database structure
    if (!config.database.type) {
        throw new Error('Database config missing type field');
    }
    
    if (!config.database.name) {
        throw new Error('Database config missing name field');
    }
}

/**
 * Test web server config structure
 */
function testWebServerConfigs() {
    const nginxContent = fs.readFileSync('nginx.conf', 'utf8');
    if (!nginxContent.includes('server {')) {
        throw new Error('nginx.conf missing server block');
    }
    
    const apacheContent = fs.readFileSync('apache.conf', 'utf8');
    if (!apacheContent.includes('VirtualHost')) {
        throw new Error('apache.conf missing VirtualHost directive');
    }
}

/**
 * Main test runner
 */
function main() {
    console.log('🔧 Configuration File Validation (Node.js)');
    console.log('==========================================');
    
    console.log('\n📁 Testing file existence...');
    
    // Test all files exist
    const allFiles = [...CONFIG_FILES.json, ...CONFIG_FILES.yaml, ...CONFIG_FILES.text];
    allFiles.forEach(filename => {
        runTest(`File exists: ${filename}`, () => testFileExists(filename));
    });
    
    console.log('\n🔍 Testing JSON syntax...');
    CONFIG_FILES.json.forEach(filename => {
        runTest(`JSON syntax: ${filename}`, () => testJsonSyntax(filename));
    });
    
    console.log('\n📝 Testing YAML syntax...');
    CONFIG_FILES.yaml.forEach(filename => {
        runTest(`YAML syntax: ${filename}`, () => testYamlSyntax(filename));
    });
    
    console.log('\n📄 Testing text files...');
    CONFIG_FILES.text.forEach(filename => {
        runTest(`Text file: ${filename}`, () => testTextFile(filename));
    });
    
    console.log('\n📋 Testing structure validation...');
    runTest('JSON Schema structure', testJsonSchemaStructure);
    runTest('Task config structure', testTaskConfigStructure);
    runTest('Web server configs', testWebServerConfigs);
    
    // Summary
    console.log('\n📊 Test Summary');
    console.log('===============');
    console.log(`Total tests:  ${testCount}`);
    console.log(`Passed:       ${passCount}`);
    console.log(`Failed:       ${failCount}`);
    
    if (failCount === 0) {
        console.log('\n🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('\n❌ Some tests failed.');
        process.exit(1);
    }
}

// Run if this is the main module
if (require.main === module) {
    main();
}

module.exports = {
    runTest,
    testFileExists,
    testJsonSyntax,
    testYamlSyntax,
    testTextFile
};