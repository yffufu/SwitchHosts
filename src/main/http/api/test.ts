/**
 * list
 * @author: oldj
 * @homepage: https://oldj.net
 */


import { Request, Response } from 'express'

const test = async (req: Request, res: Response) => {
  res.end('ok')
}

export default test
