/**
 * list
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getList, setList, updateTrayTitle, setHostsContent } from '@main/actions'
import { broadcast } from '@main/core/agent'
import events from '@common/events'
import { Request, Response } from 'express'

export async function switchState(req: Request, res: Response, flag = true) {
  const body = req.body as {
    id?: string
    test?: string
    exclude?: string[]
  }
  try {
    const { id, test, exclude } = body
    let list = await getList()
    const items = list.filter(
      (item) =>
        (id
          ? item.id === id
          : item.id.includes(test!) && (exclude ? !exclude.includes(item.id!) : true)) &&
        item.on !== flag,
    )
    const ids = items.map((item) => item.id)
    ids.length && broadcast(events.toggle_item_batch, ids, items.map(() => flag))
  } catch (e) {
    console.log('err', e)
    res.end('error')
    return
  }
  res.end('ok')
}
const on = async (req: Request, res: Response) => {
  await switchState(req, res, true)
}

export default on
