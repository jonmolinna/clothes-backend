export function isUsernameValid(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
  return usernameRegex.test(username);
}
