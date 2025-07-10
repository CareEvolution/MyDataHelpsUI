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

#### Batch Add Multiple Translation Keys

```bash
node translation-manager.js batch-add <json-file-path> [locales]
```

- `<json-file-path>`: Path to a JSON file containing key-value pairs of translations
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js batch-add "./translations.json"
node translation-manager.js batch-add "./translations.json" "en,es,fr"
```

The JSON file should have the following format:
```json
{
  "key1": "Value 1",
  "key2": "Value 2",
  "key3": "Value 3"
}
```

#### Batch Update Multiple Translation Keys

```bash
node translation-manager.js batch-update <json-file-path> [locales]
```

- `<json-file-path>`: Path to a JSON file containing key-value pairs of translations
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js batch-update "./translations.json"
node translation-manager.js batch-update "./translations.json" "en,es,fr"
```

#### Batch Add or Update Multiple Translation Keys

```bash
node translation-manager.js batch-add-or-update <json-file-path> [locales]
```

- `<json-file-path>`: Path to a JSON file containing key-value pairs of translations
- `[locales]`: Optional comma-separated list of locale codes to update (e.g., "en,es,fr")

Example:
```bash
node translation-manager.js batch-add-or-update "./translations.json"
node translation-manager.js batch-add-or-update "./translations.json" "en,es,fr"
```

## Using the Translation Utilities Library in Code

You can also use the translation utilities library directly in your code:

```javascript
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

// Batch add multiple translations
const batchAddResults = batchAddTranslations({
  'key1': 'Value 1',
  'key2': 'Value 2',
  'key3': 'Value 3'
});
console.log(batchAddResults);
// Output: { en: { key1: true, key2: true, key3: true }, es: { key1: true, ... }, ... }

// Batch update multiple translations
const batchUpdateResults = batchUpdateTranslations({
  'existing-key1': 'Updated Value 1',
  'existing-key2': 'Updated Value 2'
});
console.log(batchUpdateResults);
// Output: { en: { 'existing-key1': true, 'existing-key2': true }, es: { ... }, ... }

// Batch add or update multiple translations
const batchAddOrUpdateResults = batchAddOrUpdateTranslations({
  'new-key': 'New Value',
  'existing-key': 'Updated Value'
});
console.log(batchAddOrUpdateResults);
// Output: { en: { 'new-key': true, 'existing-key': true }, es: { ... }, ... }
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

5. For multiple translations, I can create a JSON file and use batch operations:
   ```
   node translation-manager.js batch-add-or-update "./translations.json"
   ```

These utilities will help me manage translations more efficiently and avoid errors when working with large localization files.

## Example: Creating a Batch Translation File

To create a batch translation file, create a JSON file with key-value pairs:

```json
{
  "header-title": "Welcome to Our App",
  "login-button": "Sign In",
  "signup-button": "Create Account",
  "footer-copyright": "© 2025 Example Company"
}
```

Save this as `translations.json` and then run:

```bash
node translation-manager.js batch-add-or-update "./translations.json"
```

This will add or update all the keys in all available locales in a single operation.
