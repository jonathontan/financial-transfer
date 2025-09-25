import constants from "../constants"

const baseUrl = import.meta.env.VITE_BACKEND_SERVICE

function createAccount(id: number) {
  const relativeUrl = '/accounts'
  const requestUrl = baseUrl + relativeUrl
  const requestBody = {
    account_id: id,
    initial_balance: constants.initialBalance
  }

  return fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  })
}

function getAccount(id: number) {
  const relativeUrl = `/accounts/${id}`
  const requestUrl = baseUrl + relativeUrl

  return fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  })
}

export default { createAccount, getAccount }