// get-correct-hash.ts
import bcrypt from 'bcryptjs';

async function generateHash() {
  const password = '123456';
  const hash = await bcrypt.hash(password, 10);
  console.log('✅ CORRECT HASH for "123456":');
  console.log(`'${hash}'`);
}

generateHash();

