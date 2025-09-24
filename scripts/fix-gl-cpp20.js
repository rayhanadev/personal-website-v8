#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Fix the gl package binding.gyp to use C++20 instead of C++17
 * This is required for Node.js v24+ which requires C++20 features
 */

const glBindingPath = join(process.cwd(), 'node_modules', 'gl', 'binding.gyp');

if (!existsSync(glBindingPath)) {
  console.log('gl package not found, skipping C++20 fix');
  process.exit(0);
}

try {
  let content = readFileSync(glBindingPath, 'utf8');
  
  // Check if already fixed
  if (content.includes("'CLANG_CXX_LANGUAGE_STANDARD':'c++20'")) {
    console.log('gl package already fixed for C++20');
    process.exit(0);
  }
  
  // Apply the fix
  content = content.replace(
    "'CLANG_CXX_LANGUAGE_STANDARD':'c++17'",
    "'CLANG_CXX_LANGUAGE_STANDARD':'c++20'"
  );
  
  writeFileSync(glBindingPath, content);
  console.log('✅ Fixed gl package binding.gyp to use C++20');
  
} catch (error) {
  console.error('❌ Failed to fix gl package:', error.message);
  process.exit(1);
}
