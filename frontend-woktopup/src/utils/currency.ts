export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "Rp 0"; // Nilai default jika `amount` tidak valid
  }
  return `Rp ${amount.toLocaleString()}`;
};
