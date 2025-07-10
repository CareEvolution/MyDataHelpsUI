#!/usr/bin/env node

/**
 * Translation Manager CLI
 * 
 * A command-line tool to manage translations in the localization files.
 * 
 * Usage:
 *   node translation-manager.js check <key>
 *   node translation-manager.js add <key> <value> [locales]
 *   node translation-manager.js update <key> <value> [locales]
 *   node translation-manager.js add-or-update <key> <value> [locales]
 *   node translation-manager.js list-locales
 *   node translation-manager.js batch-add <json-file-path> [locales]
 *   node translation-manager.js batch-update <json-file-path> [locales]
 *   node translation-manager.js batch-add-or-update <json-file-path> [locales]
 * 
 * Examples:
 *   node translation-manager.js check "app-title"
 *   node translation-manager.js add "new-key" "New Value" "en,es,fr"
 *   node translation-manager.js update "existing-key" "Updated Value" "en,es"
 *   node translation-manager.js add-or-update "any-key" "Value" "en,es"
 *   node translation-manager.js list-locales
 *   node translation-manager.js batch-add "./translations.json" "en,es"
 *   node translation-manager.js batch-update "./translations.json"
 *   node translation-manager.js batch-add-or-update "./translations.json"
 */

const {
  checkTranslationKey,
  addTranslation,
  updateTranslation,
  addOrUpdateTranslation,
  getAvailableLocales,
  batchAddTranslations,
  batchUpdateTranslations,
  batchAddOrUpdateTranslations
} = require('./src/helpers/translation-utils');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Print colored text to the console
 * @param {string} text - The text to print
 * @param {string} color - The color to use
 */
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
${colorize('Translation Manager CLI', 'cyan')}

A command-line tool to manage translations in the localization files.

${colorize('Usage:', 'yellow')}
  node translation-manager.js check <key>
  node translation-manager.js add <key> <value> [locales]
  node translation-manager.js update <key> <value> [locales]
  node translation-manager.js add-or-update <key> <value> [locales]
  node translation-manager.js list-locales
  node translation-manager.js batch-add <json-file-path> [locales]
  node translation-manager.js batch-update <json-file-path> [locales]
  node translation-manager.js batch-add-or-update <json-file-path> [locales]

${colorize('Examples:', 'yellow')}
  node translation-manager.js check "app-title"
  node translation-manager.js add "new-key" "New Value" "en,es,fr"
  node translation-manager.js update "existing-key" "Updated Value" "en,es"
  node translation-manager.js add-or-update "any-key" "Value" "en,es"
  node translation-manager.js list-locales
  node translation-manager.js batch-add "./translations.json" "en,es"
  node translation-manager.js batch-update "./translations.json"
  node translation-manager.js batch-add-or-update "./translations.json"
  `);
}

/**
 * Parse command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }
  
  const command = args[0];
  
  switch (command) {
    case 'check':
      if (args.length < 2) {
        console.error(colorize('Error: Missing key argument', 'red'));
        printUsage();
        process.exit(1);
      }
      return {
        command,
        key: args[1],
        locales: args[2] ? args[2].split(',') : null
      };
      
    case 'add':
    case 'update':
    case 'add-or-update':
      if (args.length < 3) {
        console.error(colorize('Error: Missing key or value arguments', 'red'));
        printUsage();
        process.exit(1);
      }
      return {
        command,
        key: args[1],
        value: args[2],
        locales: args[3] ? args[3].split(',') : null
      };
      
    case 'batch-add':
    case 'batch-update':
    case 'batch-add-or-update':
      if (args.length < 2) {
        console.error(colorize('Error: Missing JSON file path argument', 'red'));
        printUsage();
        process.exit(1);
      }
      return {
        command,
        jsonFilePath: args[1],
        locales: args[2] ? args[2].split(',') : null
      };
      
    case 'list-locales':
      return { command };
      
    case 'help':
      printUsage();
      process.exit(0);
      
    default:
      console.error(colorize(`Error: Unknown command "${command}"`, 'red'));
      printUsage();
      process.exit(1);
  }
}

/**
 * Format and print the results
 * @param {Object} results - The results to print
 * @param {string} operation - The operation that was performed
 */
function printResults(results, operation) {
  console.log(`\n${colorize(`Results of ${operation}:`, 'cyan')}`);
  
  for (const locale in results) {
    const success = results[locale];
    const status = success 
      ? colorize('SUCCESS', 'green') 
      : colorize('FAILED', 'red');
    console.log(`  ${locale}: ${status}`);
  }
  
  console.log('');
}

/**
 * Main function
 */
/**
 * Read translations from a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Object} The parsed JSON content
 */
function readTranslationsFile(filePath) {
  try {
    const fs = require('fs');
    const path = require('path');
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(colorize(`Error reading JSON file: ${error.message}`, 'red'));
    process.exit(1);
  }
}

/**
 * Format and print batch results
 * @param {Object} results - The results to print
 * @param {string} operation - The operation that was performed
 */
function printBatchResults(results, operation) {
  console.log(`\n${colorize(`Results of batch ${operation}:`, 'cyan')}`);
  
  for (const locale in results) {
    console.log(`\n  ${colorize(locale, 'yellow')}:`);
    
    const localeResults = results[locale];
    for (const key in localeResults) {
      const success = localeResults[key];
      const status = success 
        ? colorize('SUCCESS', 'green') 
        : colorize('FAILED', 'red');
      console.log(`    ${key}: ${status}`);
    }
  }
  
  console.log('');
}

function main() {
  const args = parseArgs();
  
  switch (args.command) {
    case 'check': {
      console.log(`\n${colorize(`Checking translation key "${args.key}"...`, 'cyan')}`);
      const results = checkTranslationKey(args.key, args.locales);
      
      console.log(`\n${colorize('Results:', 'cyan')}`);
      for (const locale in results) {
        const exists = results[locale];
        const status = exists 
          ? colorize('EXISTS', 'green') 
          : colorize('MISSING', 'red');
        console.log(`  ${locale}: ${status}`);
      }
      console.log('');
      break;
    }
    
    case 'add': {
      console.log(`\n${colorize(`Adding translation key "${args.key}"...`, 'cyan')}`);
      const results = addTranslation(args.key, args.value, args.locales);
      printResults(results, 'add');
      break;
    }
    
    case 'update': {
      console.log(`\n${colorize(`Updating translation key "${args.key}"...`, 'cyan')}`);
      const results = updateTranslation(args.key, args.value, args.locales);
      printResults(results, 'update');
      break;
    }
    
    case 'add-or-update': {
      console.log(`\n${colorize(`Adding or updating translation key "${args.key}"...`, 'cyan')}`);
      const results = addOrUpdateTranslation(args.key, args.value, args.locales);
      printResults(results, 'add-or-update');
      break;
    }
    
    case 'list-locales': {
      const locales = getAvailableLocales();
      console.log(`\n${colorize('Available locales:', 'cyan')}`);
      locales.forEach(locale => console.log(`  ${locale}`));
      console.log('');
      break;
    }
    
    case 'batch-add': {
      console.log(`\n${colorize(`Batch adding translations from "${args.jsonFilePath}"...`, 'cyan')}`);
      const translations = readTranslationsFile(args.jsonFilePath);
      const results = batchAddTranslations(translations, args.locales);
      printBatchResults(results, 'add');
      break;
    }
    
    case 'batch-update': {
      console.log(`\n${colorize(`Batch updating translations from "${args.jsonFilePath}"...`, 'cyan')}`);
      const translations = readTranslationsFile(args.jsonFilePath);
      const results = batchUpdateTranslations(translations, args.locales);
      printBatchResults(results, 'update');
      break;
    }
    
    case 'batch-add-or-update': {
      console.log(`\n${colorize(`Batch adding or updating translations from "${args.jsonFilePath}"...`, 'cyan')}`);
      const translations = readTranslationsFile(args.jsonFilePath);
      const results = batchAddOrUpdateTranslations(translations, args.locales);
      printBatchResults(results, 'add-or-update');
      break;
    }
  }
}

// Run the main function
main();
