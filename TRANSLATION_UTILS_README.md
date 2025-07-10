# Translation Utilities

This project includes utilities to help manage translations in the localization files. These utilities make it easier to check for the existence of strings, add new strings, and update existing strings across multiple locale files.

## Available Tools

### 1. Translation Utilities Library

Located at `src/helpers/translation-utils.js`, this library provides functions to:

- Check if a translation key exists in locale files
- Add new translation keys
- Update existing translation keys
- Add or update translation keys (combined operation)
- Get a list of available locales

### 2. Translation Manager CLI

Located at `translation-manager.js`, this command-line tool provides a user-friendly interface to the translation utilities library.

## Using the Translation Manager CLI

The Translation Manager CLI can be run using Node.js:

```bash
node translation-manager.js <command> [arguments]
```

### Available Commands

#### List Available Locales

```bash
node translation-manager.js list-locales
```

This command lists all available locale codes in the project.

#### Check if a Translation Key Exists

```bash
node translation-manager.js check <key> [locales]
```

- `<key>`: The translation key to check
- `[locales]`: Optional comma-separated list of locale codes to check (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js check "app-title"
node translation-manager.js check "app-title" "en,es,fr"
```

#### Add a New Translation Key

```bash
node translation-manager.js add <key> <value> [locales]
```

- `<key>`: The translation key to add
- `<value>`: The translation value to add
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js add "new-key" "New Value"
node translation-manager.js add "new-key" "New Value" "en,es,fr"
```

#### Update an Existing Translation Key

```bash
node translation-manager.js update <key> <value> [locales]
```

- `<key>`: The translation key to update
- `<value>`: The new translation value
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js update "existing-key" "Updated Value"
node translation-manager.js update "existing-key" "Updated Value" "en,es,fr"
```

#### Add or Update a Translation Key

```bash
node translation-manager.js add-or-update <key> <value> [locales]
```

- `<key>`: The translation key to add or update
- `<value>`: The translation value
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js add-or-update "any-key" "Value"
node translation-manager.js add-or-update "any-key" "Value" "en,es,fr"
```

## Using the Translation Utilities Library in Code

You can also use the translation utilities library directly in your code:

```javascript
const {
  checkTranslationKey,
  addTranslation,
  updateTranslation,
  addOrUpdateTranslation,
  getAvailableLocales
} = require('./src/helpers/translation-utils');

// Check if a key exists
const existsResults = checkTranslationKey('app-title');
console.log(existsResults);
// Output: { en: true, es: true, fr: true, ... }

// Add a new translation
const addResults = addTranslation('new-key', 'New Value', ['en', 'es']);
console.log(addResults);
// Output: { en: true, es: true }

// Update an existing translation
const updateResults = updateTranslation('existing-key', 'Updated Value');
console.log(updateResults);
// Output: { en: true, es: true, fr: true, ... }

// Add or update a translation
const addOrUpdateResults = addOrUpdateTranslation('any-key', 'Value');
console.log(addOrUpdateResults);
// Output: { en: true, es: true, fr: true, ... }

// Get available locales
const locales = getAvailableLocales();
console.log(locales);
// Output: ['en', 'es', 'fr', ...]
```

## Advanced Usage: Locale-Specific Values

When adding or updating translations, you can provide locale-specific values by passing an object instead of a string:

```javascript
// Using the CLI
// Not directly supported, but you can create a script that uses the library

// Using the library
const values = {
  en: 'Hello',
  es: 'Hola',
  fr: 'Bonjour'
};

addTranslation('greeting', values);
// or
updateTranslation('greeting', values);
// or
addOrUpdateTranslation('greeting', values);
```

## Notes for AI Assistant Usage

When asked to update translations, I can use these utilities to help manage the localization files. Here's how I would approach it:

1. First, check if the translation key exists:
   ```
   node translation-manager.js check "key-to-check"
   ```

2. If the key exists and needs to be updated:
   ```
   node translation-manager.js update "key-to-check" "Updated Value"
   ```

3. If the key doesn't exist and needs to be added:
   ```
   node translation-manager.js add "new-key" "New Value"
   ```

4. If I'm not sure whether the key exists:
   ```
   node translation-manager.js add-or-update "any-key" "Value"
   ```

These utilities will help me manage translations more efficiently and avoid errors when working with large localization files.
