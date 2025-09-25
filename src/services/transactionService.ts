const baseUrl = import.meta.env.VITE_BACKEND_SERVICE

function internalTransfer(
  accountId: number,
  recipientId: number,
  amount: string
) {
  const relativeUrl = "/transactions"
  const requestUrl = baseUrl + relativeUrl
  const requestBody = {
    source_account_id: accountId,
    destination_account_id: recipientId,
    amount: amount
  }

  return fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify(requestBody)
  })
}

export default {
  internalTransfer
}