export interface SessionUserData {
  username: string;
  municipio: string;
}

const SESSION_KEY = 'session';

export const createSession = (username: string, municipio: string): void => {
  const data: SessionUserData = { username, municipio };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const getSessionUserData = (): SessionUserData | null => {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUserData;
  } catch {
    removeSession();
    return null;
  }
};

export const isSessionValid = (): boolean => {
  return getSessionUserData() !== null;
};

export const removeSession = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};
