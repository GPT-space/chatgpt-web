export type ResponseStatus = 'Success' | 'Fail'

// 没必要使用code
interface SendResponseOptions<T = any> {
  type: ResponseStatus
  message?: string
  data?: T
}

export interface ResponseData<T> {
  message: string
  data: T
  status: ResponseStatus
}

export function makeSuccessRes<T = any>(data?: T) {
  return {
    message: '成功',
    data,
    status: 'Success',
  }
}

export function makeFailRes<T = any>(message = '失败', data?: T): ResponseData<T> {
  return {
    message,
    data,
    status: 'Fail',
  }
}

export function sendResponse<T>(options: SendResponseOptions<T>): Promise<ResponseData<T>> {
  if (options.type === 'Success') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  })
}
