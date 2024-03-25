export function calculateBMI(heightInCm, weightInKg) {
  const heightInMeters = parseFloat(heightInCm) / 100;
  const weightInKilograms = parseFloat(weightInKg);

  if (!heightInMeters || !weightInKilograms) {
    return "Invalid input";
  }

  const bmi = weightInKilograms / heightInMeters ** 2;
  return bmi.toFixed(2);
}
