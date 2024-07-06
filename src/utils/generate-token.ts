export function generateNumericToken(length = 5):string {
  let token = '';
  for (let i = 0; i < length; i++) {
      token += Math.floor(Math.random() * 10);
  }
  return token;
}