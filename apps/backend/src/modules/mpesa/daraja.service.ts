export async function sendToMpesa(params: any): Promise<any> {
  return {
    receiptId: `stub-mpesa-${Date.now()}`,
    params,
    status: "SUCCESS",
  };
}

export async function sendToTill(params: any): Promise<any> {
  return {
    receiptId: `stub-till-${Date.now()}`,
    params,
    status: "SUCCESS",
  };
}

export const darajaService = {
  sendToMpesa,
  sendToTill,
};
