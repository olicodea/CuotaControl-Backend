export const LoanTypes = {
  prestado: 1,
  recibido: 2,
};

export const LoanTypesReverse = Object.fromEntries(
  Object.entries(LoanTypes).map(([key, value]) => [value, key])
);
