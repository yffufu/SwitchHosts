/**
 * list
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getList, setList, updateTrayTitle, setHostsContent } from '@main/actions'
import { broadcast } from '@main/core/agent'
import events from '@common/events'
import { findItemById } from '@common/hostsFn'
import { Request, Response } from 'express'

const active = async (req: Request, res: Response) => {
  try {
    broadcast(events.active_main_window)
  } catch (e) {
    console.log('err', e)
    res.end('error')
    return
  }
  res.end('ok')
}

export default active
