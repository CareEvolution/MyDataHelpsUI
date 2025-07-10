/**
 * Translation Utilities
 * 
 * This utility provides functions to help manage translations in the localization files.
 * It allows checking for the existence of strings, adding new strings, and updating existing strings.
 * 
 * Usage:
 * 1. Import the utility: import { checkTranslationKey, addTranslation, updateTranslation } from './translation-utils';
 * 2. Use the functions as needed:
 *    - checkTranslationKey('key-to-check') - Returns an object with results for each locale
 *    - addTranslation('new-key', 'New value', ['en', 'es']) - Adds a new translation to specified locales
 *    - updateTranslation('existing-key', 'Updated value', ['en', 'es']) - Updates an existing translation in specified locales
 */

const fs = require('fs');
const path = require('path');

/**
 * Get the path to the locales directory
 * @returns {string} The absolute path to the locales directory
 */
function getLocalesPath() {
  return path.resolve(process.cwd(), 'locales');
}

/**
 * Get all available locales
 * @returns {string[]} Array of locale codes (e.g., ['en', 'es', 'fr'])
 */
function getAvailableLocales() {
  const localesPath = getLocalesPath();
  return fs.readdirSync(localesPath)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

/**
 * Read a locale file
 * @param {string} locale - The locale code (e.g., 'en', 'es')
 * @returns {Object} The parsed JSON content of the locale file
 */
function readLocaleFile(locale) {
  const localesPath = getLocalesPath();
  const filePath = path.join(localesPath, `${locale}.json`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading locale file ${locale}.json:`, error);
    return null;
  }
}

/**
 * Write to a locale file
 * @param {string} locale - The locale code (e.g., 'en', 'es')
 * @param {Object} content - The content to write to the file
 * @returns {boolean} True if successful, false otherwise
 */
function writeLocaleFile(locale, content) {
  const localesPath = getLocalesPath();
  const filePath = path.join(localesPath, `${locale}.json`);
  
  try {
    // Format the JSON with 4 spaces indentation to maintain readability
    const formattedContent = JSON.stringify(content, null, 4);
    fs.writeFileSync(filePath, formattedContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing to locale file ${locale}.json:`, error);
    return false;
  }
}

/**
 * Check if a translation key exists in the specified locales
 * @param {string} key - The translation key to check
 * @param {string[]} [locales] - Optional array of locale codes to check. If not provided, checks all available locales.
 * @returns {Object} An object with locale codes as keys and boolean values indicating if the key exists
 */
function checkTranslationKey(key, locales) {
  const localesToCheck = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToCheck) {
    const localeData = readLocaleFile(locale);
    results[locale] = localeData ? key in localeData : false;
  }
  
  return results;
}

/**
 * Add a new translation to the specified locales
 * @param {string} key - The translation key to add
 * @param {string|Object} value - The translation value or an object with locale-specific values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and boolean values indicating success
 */
function addTranslation(key, value, locales) {
  const localesToUpdate = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToUpdate) {
    const localeData = readLocaleFile(locale);
    
    if (!localeData) {
      results[locale] = false;
      continue;
    }
    
    // Skip if the key already exists
    if (key in localeData) {
      console.warn(`Translation key "${key}" already exists in ${locale}.json`);
      results[locale] = false;
      continue;
    }
    
    // Determine the value to add
    const valueToAdd = typeof value === 'object' ? (value[locale] || value['en'] || key) : value;
    
    // Add the new key-value pair
    // Create a new object to maintain alphabetical order
    const updatedData = {};
    const keys = [...Object.keys(localeData), key].sort();
    
    for (const k of keys) {
      updatedData[k] = k === key ? valueToAdd : localeData[k];
    }
    
    results[locale] = writeLocaleFile(locale, updatedData);
  }
  
  return results;
}

/**
 * Update an existing translation in the specified locales
 * @param {string} key - The translation key to update
 * @param {string|Object} value - The new translation value or an object with locale-specific values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and boolean values indicating success
 */
function updateTranslation(key, value, locales) {
  const localesToUpdate = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToUpdate) {
    const localeData = readLocaleFile(locale);
    
    if (!localeData) {
      results[locale] = false;
      continue;
    }
    
    // Skip if the key doesn't exist
    if (!(key in localeData)) {
      console.warn(`Translation key "${key}" does not exist in ${locale}.json`);
      results[locale] = false;
      continue;
    }
    
    // Determine the value to update
    const valueToUpdate = typeof value === 'object' ? (value[locale] || value['en'] || key) : value;
    
    // Update the key-value pair
    localeData[key] = valueToUpdate;
    
    results[locale] = writeLocaleFile(locale, localeData);
  }
  
  return results;
}

/**
 * Add or update a translation in the specified locales
 * @param {string} key - The translation key to add or update
 * @param {string|Object} value - The translation value or an object with locale-specific values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and boolean values indicating success
 */
function addOrUpdateTranslation(key, value, locales) {
  const existsResults = checkTranslationKey(key, locales);
  const localesToAdd = [];
  const localesToUpdate = [];
  
  // Separate locales into those that need adding vs updating
  for (const locale in existsResults) {
    if (existsResults[locale]) {
      localesToUpdate.push(locale);
    } else {
      localesToAdd.push(locale);
    }
  }
  
  // Perform the operations
  const addResults = localesToAdd.length > 0 ? addTranslation(key, value, localesToAdd) : {};
  const updateResults = localesToUpdate.length > 0 ? updateTranslation(key, value, localesToUpdate) : {};
  
  // Combine results
  return { ...addResults, ...updateResults };
}

/**
 * Batch update multiple translations at once
 * @param {Object} translations - An object with keys as translation keys and values as translation values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and objects with translation keys and success status as values
 */
function batchUpdateTranslations(translations, locales) {
  const localesToUpdate = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToUpdate) {
    const localeData = readLocaleFile(locale);
    
    if (!localeData) {
      results[locale] = Object.keys(translations).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      continue;
    }
    
    let updated = false;
    const keyResults = {};
    
    for (const key in translations) {
      const value = translations[key];
      
      // Skip if the key doesn't exist
      if (!(key in localeData)) {
        keyResults[key] = false;
        continue;
      }
      
      // Determine the value to update
      const valueToUpdate = typeof value === 'object' ? (value[locale] || value['en'] || key) : value;
      
      // Update the key-value pair
      localeData[key] = valueToUpdate;
      updated = true;
      keyResults[key] = true;
    }
    
    // Only write to file if at least one key was updated
    if (updated) {
      const writeSuccess = writeLocaleFile(locale, localeData);
      if (!writeSuccess) {
        // If write failed, mark all keys as failed
        for (const key in keyResults) {
          if (keyResults[key]) {
            keyResults[key] = false;
          }
        }
      }
    }
    
    results[locale] = keyResults;
  }
  
  return results;
}

/**
 * Batch add multiple translations at once
 * @param {Object} translations - An object with keys as translation keys and values as translation values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and objects with translation keys and success status as values
 */
function batchAddTranslations(translations, locales) {
  const localesToUpdate = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToUpdate) {
    const localeData = readLocaleFile(locale);
    
    if (!localeData) {
      results[locale] = Object.keys(translations).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      continue;
    }
    
    let updated = false;
    const keyResults = {};
    
    // Create a new object to maintain alphabetical order
    const updatedData = { ...localeData };
    
    for (const key in translations) {
      const value = translations[key];
      
      // Skip if the key already exists
      if (key in localeData) {
        keyResults[key] = false;
        continue;
      }
      
      // Determine the value to add
      const valueToAdd = typeof value === 'object' ? (value[locale] || value['en'] || key) : value;
      
      // Add the new key-value pair
      updatedData[key] = valueToAdd;
      updated = true;
      keyResults[key] = true;
    }
    
    // Only write to file if at least one key was added
    if (updated) {
      // Sort keys alphabetically
      const sortedData = {};
      Object.keys(updatedData).sort().forEach(key => {
        sortedData[key] = updatedData[key];
      });
      
      const writeSuccess = writeLocaleFile(locale, sortedData);
      if (!writeSuccess) {
        // If write failed, mark all keys as failed
        for (const key in keyResults) {
          if (keyResults[key]) {
            keyResults[key] = false;
          }
        }
      }
    }
    
    results[locale] = keyResults;
  }
  
  return results;
}

/**
 * Batch add or update multiple translations at once
 * @param {Object} translations - An object with keys as translation keys and values as translation values
 * @param {string[]} [locales] - Optional array of locale codes to update. If not provided, updates all available locales.
 * @returns {Object} An object with locale codes as keys and objects with translation keys and success status as values
 */
function batchAddOrUpdateTranslations(translations, locales) {
  const localesToUpdate = locales || getAvailableLocales();
  const results = {};
  
  for (const locale of localesToUpdate) {
    const localeData = readLocaleFile(locale);
    
    if (!localeData) {
      results[locale] = Object.keys(translations).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      continue;
    }
    
    let updated = false;
    const keyResults = {};
    
    // Create a new object to maintain alphabetical order
    const updatedData = { ...localeData };
    
    for (const key in translations) {
      const value = translations[key];
      
      // Determine the value to add/update
      const valueToSet = typeof value === 'object' ? (value[locale] || value['en'] || key) : value;
      
      // Add or update the key-value pair
      updatedData[key] = valueToSet;
      updated = true;
      keyResults[key] = true;
    }
    
    // Only write to file if at least one key was added/updated
    if (updated) {
      // Sort keys alphabetically
      const sortedData = {};
      Object.keys(updatedData).sort().forEach(key => {
        sortedData[key] = updatedData[key];
      });
      
      const writeSuccess = writeLocaleFile(locale, sortedData);
      if (!writeSuccess) {
        // If write failed, mark all keys as failed
        for (const key in keyResults) {
          if (keyResults[key]) {
            keyResults[key] = false;
          }
        }
      }
    }
    
    results[locale] = keyResults;
  }
  
  return results;
}

module.exports = {
  checkTranslationKey,
  addTranslation,
  updateTranslation,
  addOrUpdateTranslation,
  getAvailableLocales,
  batchUpdateTranslations,
  batchAddTranslations,
  batchAddOrUpdateTranslations
};
