function ensureBearer(token: string): string {
  const prefix = "Bearer ";
  if (!token.toLowerCase().startsWith(prefix.toLowerCase())) {
    return `${prefix}${token}`;
  }
  return token;
}