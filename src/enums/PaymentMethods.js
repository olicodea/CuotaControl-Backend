export const PaymentMethods = {
    efectivo: 1,
    transferencia: 2, 
};

export const PaymentMethodsReverse = Object.fromEntries(
    Object.entries(PaymentMethods).map(([key, value]) => [value, key])
);