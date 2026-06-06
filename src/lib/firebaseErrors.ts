/** Mensaje legible cuando Google Cloud/Firebase bloquea por facturación. */
export function formatFirebaseError(message: string, code?: string): string {
  const combined = `${code ?? ''} ${message}`.toLowerCase();
  if (
    combined.includes('delinquent') ||
    combined.includes('billing account') ||
    combined.includes('disabled in state') ||
    code === '402'
  ) {
    return (
      'La facturación del proyecto Firebase/Google Cloud está suspendida (cuenta en mora). ' +
      'Hasta reactivarla, Storage y las descargas de imágenes no funcionan. ' +
      'Entra en console.cloud.google.com → Facturación y regulariza el pago, o crea un proyecto Firebase nuevo con plan Blaze activo.'
    );
  }
  return message;
}
