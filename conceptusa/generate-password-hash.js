#!/usr/bin/env node

/**
 * Generator hasha hasła dla panelu administracyjnego
 *
 * Użycie:
 * node generate-password-hash.js [hasło]
 *
 * Jeśli nie podasz hasła, zostaniesz o nie zapytany
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const args = process.argv.slice(2);

if (args.length > 0) {
  // Hasło podane jako argument
  const password = args[0];
  generateHash(password);
} else {
  // Pytaj o hasło interaktywnie
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Wpisz nowe hasło administratora: ', (password) => {
    if (!password) {
      console.error('❌ Hasło nie może być puste!');
      rl.close();
      process.exit(1);
    }

    generateHash(password);
    rl.close();
  });
}

function generateHash(password) {
  console.log('\n🔐 Generuję hash hasła...\n');

  // Generuj hash (10 rounds - balans między bezpieczeństwem a szybkością)
  const hash = bcrypt.hashSync(password, 10);

  console.log('✅ Hash wygenerowany!\n');
  console.log('📋 Skopiuj poniższy hash do src/AdminPanel.js:\n');
  console.log('─'.repeat(70));
  console.log(hash);
  console.log('─'.repeat(70));
  console.log('\n📝 Instrukcja:');
  console.log('1. Otwórz plik: src/AdminPanel.js');
  console.log('2. Znajdź linię z ADMIN_PASSWORD_HASH');
  console.log('3. Zastąp stary hash nowym');
  console.log('\nPrzykład:');
  console.log(`const ADMIN_PASSWORD_HASH = '${hash}';`);
  console.log('\n✅ Gotowe!\n');
}
