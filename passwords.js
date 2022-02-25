const NUMBER_OF_PASSWORDS = 100;

const PASSWORDS = Array.from(
  { length: NUMBER_OF_PASSWORDS },
  (_, index) => `pass${index + 1}`
).reduce(
  (passwords, password) => ({ ...passwords, [password]: "pending" }),
  {}
);

module.exports = PASSWORDS;
