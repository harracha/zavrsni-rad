import { paginationInfo } from '../../types/pagination'

export const paginationQueryParser = (url: string) => {
  const filter: paginationInfo = {
    itemsPerPg: undefined,
    pageNr: undefined,
  }
  const splitUrl = url.split('?')
  if (splitUrl.length === 1) {
    return filter
  }
  const paramsString = splitUrl[1]
  const paramsArray = paramsString.split('&')

  paramsArray.forEach(param => {
    var split_parameter = param.split('=')
    if (split_parameter.length !== 1) {
      switch (split_parameter[0]) {
        case 'pageNr':
          filter.pageNr = parseInt(split_parameter[1])
          break
        case 'itemsPerPg':
          filter.itemsPerPg = parseInt(split_parameter[1])
          break
        default:
        // console.log(`error parameter -> ${split_parameter[0]}`)
      }
    }
  })
  return filter
}
