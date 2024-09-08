export const InstallmentStatuses = {
    pendiente: 1,
    pagada: 2,
    atrasada: 3,
};

export const InstallmentStatusesReverse = Object.fromEntries(
    Object.entries(InstallmentStatuses).map(([key, value]) => [value, key])
);
