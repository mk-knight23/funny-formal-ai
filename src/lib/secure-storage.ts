/**
 * Secure Storage Utility with Encryption
 *
 * This module provides encrypted localStorage for API keys using the Web Crypto API.
 * Keys are encrypted before storage and decrypted after retrieval.
 *
 * SECURITY NOTES:
 * - Uses AES-GCM (Galois/Counter Mode) for authenticated encryption
 * - Derives encryption key from a browser-specific fingerprint
 * - Each encrypted value includes a unique IV (Initialization Vector)
 * - Provides migration path for existing plain-text keys
 *
 * LIMITATIONS:
 * - Client-side encryption only protects against local access
 * - XSS vulnerabilities can still decrypt keys (attacker has same access as app)
 * - For production, use server-side key management with proper authentication
 */

import type { APIKeyConfig } from './multi-providers';

const STORAGE_KEY = 'apiKeys';
const ENCRYPTED_STORAGE_KEY = 'apiKeysEncrypted';
const ENCRYPTION_KEY_ID = 'ai_vibe_encryption_key';
const KEY_DERIVATION_SALT = 'ai-vibe-ecosystem-v3-salt';

/**
 * Encryption result format
 */
interface EncryptedData {
  data: string; // Base64 encoded ciphertext
  iv: string; // Base64 encoded initialization vector
  version: number; // Encryption version for future migrations
}

/**
 * Safe browser-only localStorage access with error handling
 */
function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    const ls = window.localStorage;
    if (!ls || typeof ls.getItem !== 'function') return null;
    // Test it works
    ls.setItem('__test__', '__test__');
    ls.removeItem('__test__');
    return ls;
  } catch {
    return null;
  }
}

/**
 * Generate a browser-specific encryption key
 * Uses browser fingerprint to derive a consistent key across sessions
 */
async function getEncryptionKey(): Promise<CryptoKey | null> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    return null;
  }

  try {
    // Create a browser-specific key material
    const fingerprint = [
      window.navigator.userAgent,
      window.navigator.language,
      window.screen.colorDepth,
      new Date().getTimezoneOffset(),
      ENCRYPTION_KEY_ID
    ].join('|');

    // Import the fingerprint as key material
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(fingerprint),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    // Derive the actual encryption key
    return await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(KEY_DERIVATION_SALT),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  } catch (error) {
    console.error('Failed to generate encryption key:', error);
    return null;
  }
}

/**
 * Encrypt data using AES-GCM
 */
async function encryptData(data: string): Promise<EncryptedData | null> {
  const key = await getEncryptionKey();
  if (!key) return null;

  try {
    const encoder = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(data)
    );

    return {
      data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv)),
      version: 1
    };
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
}

/**
 * Decrypt data using AES-GCM
 */
async function decryptData(encryptedData: EncryptedData): Promise<string | null> {
  const key = await getEncryptionKey();
  if (!key) return null;

  try {
    const ciphertext = Uint8Array.from(atob(encryptedData.data), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(encryptedData.iv), c => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Check if encrypted storage exists
 */
function hasEncryptedStorage(): boolean {
  const ls = getLocalStorage();
  if (!ls) return false;
  return ls.getItem(ENCRYPTED_STORAGE_KEY) !== null;
}

/**
 * Migrate plain-text keys to encrypted format
 */
async function migrateToEncrypted(plainKeys: APIKeyConfig): Promise<boolean> {
  const keysJson = JSON.stringify(plainKeys);
  const encrypted = await encryptData(keysJson);

  if (!encrypted) return false;

  const ls = getLocalStorage();
  if (!ls) return false;

  try {
    // Save encrypted version
    ls.setItem(ENCRYPTED_STORAGE_KEY, JSON.stringify(encrypted));

    // Remove plain-text version after successful encryption
    ls.removeItem(STORAGE_KEY);

    return true;
  } catch (error) {
    console.error('Migration to encrypted storage failed:', error);
    return false;
  }
}

/**
 * Get API keys from storage (with automatic migration)
 *
 * This function:
 * 1. First checks for encrypted storage
 * 2. If not found, checks for plain-text storage
 * 3. If plain-text found, migrates to encrypted format
 * 4. Returns decrypted keys
 */
export async function getStoredApiKeysSecure(): Promise<APIKeyConfig> {
  const ls = getLocalStorage();
  if (!ls) return {};

  try {
    // Try encrypted storage first
    const encryptedStr = ls.getItem(ENCRYPTED_STORAGE_KEY);
    if (encryptedStr) {
      const encrypted: EncryptedData = JSON.parse(encryptedStr);
      const decrypted = await decryptData(encrypted);
      if (decrypted) {
        return JSON.parse(decrypted);
      }
    }

    // Check for plain-text storage (migration needed)
    const plainStr = ls.getItem(STORAGE_KEY);
    if (plainStr) {
      const plainKeys: APIKeyConfig = JSON.parse(plainStr);

      // Migrate to encrypted format
      await migrateToEncrypted(plainKeys);

      return plainKeys;
    }

    return {};
  } catch (error) {
    console.error('Failed to retrieve API keys:', error);
    return {};
  }
}

/**
 * Synchronous version for backwards compatibility
 * Note: Returns empty object if async operation needed
 * Use getStoredApiKeysSecure() for proper encryption support
 */
export function getStoredApiKeysSync(): APIKeyConfig {
  const ls = getLocalStorage();
  if (!ls) return {};

  try {
    // Try encrypted storage first
    const encryptedStr = ls.getItem(ENCRYPTED_STORAGE_KEY);
    if (encryptedStr) {
      const encrypted: EncryptedData = JSON.parse(encryptedStr);
      // Synchronous decryption not possible, trigger migration to plain
      // This is a fallback - ideally use the async version
      return {};
    }

    // Check for plain-text storage
    const plainStr = ls.getItem(STORAGE_KEY);
    if (plainStr) {
      return JSON.parse(plainStr);
    }

    return {};
  } catch (error) {
    console.error('Failed to retrieve API keys:', error);
    return {};
  }
}

/**
 * Save API keys with encryption
 */
export async function saveApiKeysSecure(keys: APIKeyConfig): Promise<boolean> {
  const keysJson = JSON.stringify(keys);
  const encrypted = await encryptData(keysJson);

  if (!encrypted) {
    console.error('Failed to encrypt API keys');
    return false;
  }

  const ls = getLocalStorage();
  if (!ls) return false;

  try {
    ls.setItem(ENCRYPTED_STORAGE_KEY, JSON.stringify(encrypted));
    // Ensure plain-text version is removed
    ls.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to save encrypted API keys:', error);
    return false;
  }
}

/**
 * Clear all stored API keys (both encrypted and plain-text)
 */
export function clearStoredApiKeys(): void {
  const ls = getLocalStorage();
  if (!ls) return;

  try {
    ls.removeItem(STORAGE_KEY);
    ls.removeItem(ENCRYPTED_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear API keys:', error);
  }
}

/**
 * Check if encrypted storage is in use
 */
export function isUsingEncryptedStorage(): boolean {
  return hasEncryptedStorage();
}
