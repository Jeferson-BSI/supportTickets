const VALID_CREDENTIALS = {
  email: 'admin@admin.com',
  password: '123456',
} as const;

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'UNKNOWN_ERROR';
  message: string;
}

type AuthResult =
  | { success: true; data: AuthResponse }
  | { success: false; error: AuthError };

function generateToken(email: string): string {
  const timestamp = Date.now();
  const payload = btoa(JSON.stringify({ email, iat: timestamp }));
  return `st_${payload}`;
}

export async function signIn(credentials: AuthCredentials): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const isValid =
    credentials.email.toLowerCase() === VALID_CREDENTIALS.email &&
    credentials.password === VALID_CREDENTIALS.password;

  if (!isValid) {
    return {
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'E-mail ou senha inválidos. Verifique suas credenciais.',
      },
    };
  }

  return {
    success: true,
    data: {
      token: generateToken(credentials.email),
      user: {
        email: credentials.email,
        name: 'Administrador',
      },
    },
  };
}
