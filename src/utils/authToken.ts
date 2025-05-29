/**
 * Session Security Utilities
 * Secures entire sessionStorage content with token verification
 * and tokenizes user data for additional security
 */

// Define the user data structure
export interface UserData {
  username: string;
  municipio: string;
  region: {
    id: number;
    name: string;
  };
}

// Define the session data structure
export interface SessionData {
  userDataToken: string;    // Tokenized user data
  isAuthenticated: boolean;
  exp: number;              // Expiration timestamp
  tokenSignature: string;   // Security signature for verification
}

// Session storage key
const SESSION_KEY = 'secureSession';

/**
 * Generate a simple token signature for verification
 * In a real app, you'd use a proper cryptographic signing mechanism
 */
const generateSignature = (data: any, salt: string): string => {
  // Simple hash function - in a real app use a proper crypto library
  const str = JSON.stringify(data) + salt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

/**
 * Tokenize user data with a simple encryption
 * In a real app, use a proper encryption library
 */
const tokenizeUserData = (userData: UserData, key: string): string => {
  // Create a simple tokenization of the user data
  // This is a basic implementation for demonstration purposes
  // In a real app, use proper encryption
  
  const dataStr = JSON.stringify(userData);
  let tokenized = '';
  
  // Simple character shift based on key
  for (let i = 0; i < dataStr.length; i++) {
    const charCode = dataStr.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const shiftedChar = String.fromCharCode(charCode ^ keyChar);
    tokenized += shiftedChar;
  }
  
  // Convert to base64 for safe storage
  return btoa(tokenized);
};

/**
 * Detokenize user data
 * In a real app, use a proper decryption library
 */
const detokenizeUserData = (token: string, key: string): UserData => {
  try {
    // Decode from base64
    const tokenized = atob(token);
    let dataStr = '';
    
    // Reverse the character shift based on key
    for (let i = 0; i < tokenized.length; i++) {
      const charCode = tokenized.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const unshiftedChar = String.fromCharCode(charCode ^ keyChar);
      dataStr += unshiftedChar;
    }
    
    return JSON.parse(dataStr) as UserData;
  } catch (error) {
    console.error('Error detokenizing user data:', error);
    throw new Error('Invalid user data token');
  }
};

/**
 * Verify a session's integrity
 */
const verifySession = (session: SessionData): boolean => {
  if (!session || !session.exp || !session.tokenSignature || !session.userDataToken) return false;
  
  // Check expiration
  const now = new Date().getTime();
  if (session.exp < now) return false;
  
  try {
    // Verify signature (excluding the signature itself from verification)
    const { tokenSignature, ...dataToVerify } = session;
    
    // Use a fixed salt for signature verification since we don't have
    // direct access to the username at this point (it's tokenized)
    const expectedSignature = generateSignature(dataToVerify, 'session-verification-salt');
    
    return tokenSignature === expectedSignature;
  } catch (error) {
    return false;
  }
};

/**
 * Create and store a secure session
 */
export const createSecureSession = (
  username: string,
  municipio: string,
  region: { id: number; name: string },
  expiresInMinutes = 60 // Default 1 hour expiration
): void => {
  // Create user data object
  const userData: UserData = {
    username,
    municipio,
    region
  };
  
  // Tokenize the user data - use username as encryption key for demonstration
  // In a real app, use a more secure key management strategy
  const userDataToken = tokenizeUserData(userData, username + 'secure-key');
  
  // Create session data with tokenized user data
  const now = new Date();
  const exp = now.getTime() + expiresInMinutes * 60 * 1000;
  
  const sessionData: Omit<SessionData, 'tokenSignature'> = {
    userDataToken,
    isAuthenticated: true,
    exp
  };
  
  // Add signature for verification
  const tokenSignature = generateSignature(sessionData, 'session-verification-salt');
  const secureSession: SessionData = {
    ...sessionData,
    tokenSignature
  };
  
  // Store in sessionStorage
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(secureSession));
};

/**
 * Get the current secure session
 */
export const getSecureSession = (): SessionData | null => {
  const sessionStr = sessionStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    const session = JSON.parse(sessionStr) as SessionData;
    
    // Verify session integrity and expiration
    if (!verifySession(session)) {
      removeSecureSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error retrieving secure session:', error);
    removeSecureSession();
    return null;
  }
};

/**
 * Check if session is valid
 */
export const isSessionValid = (): boolean => {
  const session = getSecureSession();
  return session !== null;
};

/**
 * Get user data from secure session
 */
export const getSessionUserData = (): UserData | null => {
  try {
    const session = getSecureSession();
    if (!session || !session.userDataToken) return null;
    
    // We need to figure out which key to use for detokenization
    // In a real application, you would have a more sophisticated approach
    // For now, we'll try to detokenize with each known user's credentials
    // This is NOT recommended for production - it's just to demonstrate the concept
    for (const knownUsername of ['chiclana', 'santa_elena', 'carboneros', 'admin']) {
      try {
        return detokenizeUserData(session.userDataToken, knownUsername + 'secure-key');
      } catch {
        // If this key doesn't work, try the next one
        continue;
      }
    }
    
    // If we couldn't detokenize with any known key, the session is invalid
    removeSecureSession();
    return null;
  } catch (error) {
    console.error('Error retrieving user data from session:', error);
    removeSecureSession();
    return null;
  }
};

/**
 * Remove secure session from storage
 */
export const removeSecureSession = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};
