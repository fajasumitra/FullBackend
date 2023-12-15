const { execSync } = require('child_process'); // sync
//const { exec } = require('child_process'); // async

// Define the Python script path
const pythonScriptPath = 'path/to/your/predictions.py';

// Run the Python script using execSync (sync)
try {
    const result = execSync(`python ${pythonScriptPath}`, { encoding: 'utf-8' });
    console.log(result);
} catch (error) {
    console.error('Error:', error.message);
}

// Run the Python script using exec (async)
// exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error('Error:', error.message);
//         return;
//     }
//     console.log(stdout);
// });