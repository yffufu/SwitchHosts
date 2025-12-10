/**
 * list
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { Request, Response } from 'express'
import { switchState } from './on'

const off = async (req: Request, res: Response) => {
  switchState(req, res, false)
}

export default off
