export const generateRandomEmail = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = '';
  const length = 10;

  for (let i = 0; i < length; i++) {
    const randomChar: number = Math.floor(Math.random() * chars.length);
    email += chars.substring(randomChar, randomChar + 1);
  }

  const domains: string[] = [
    'example.com',
    'test.com',
    'dummy.net',
    'sample.org',
    'gmail.com',
  ];
  const randomDomainIndex: number = Math.floor(Math.random() * domains.length);
  const domain: string = domains[randomDomainIndex];

  email += '@' + domain;
  return email;
};
