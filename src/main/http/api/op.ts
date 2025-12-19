/**
 * list
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getList, setList, updateTrayTitle, setHostsContent } from '@main/actions'
import { broadcast } from '@main/core/agent'
import events from '@common/events'
import { Request, Response } from 'express'
interface Op {
    op: 'on' | 'off'
    id?: string
    test?: string
    exclude?: string[]
};

export async function op(req: Request, res: Response) {
  const body = req.body as Op[]
  try {
    let list = await getList()
    const items = body.reduce<Record<string, boolean>>((acc, item) => {
      const { id, test, exclude, op } = item
      const flag = op === 'on'
      if (id) {
        const mem = list.find((mem) => mem.id === id)
        if (!mem || mem?.on === flag) return acc
        acc[id] = flag
      } else if (item.test) {
        const new_list = list.filter((mem) => {
          return (
            (mem.id.includes(test!)|| mem.title?.includes?.(test!)) &&
            (exclude ? !exclude.includes(mem.id!) : true) &&
            mem.on !== flag
          )
        })
        new_list.forEach((mem) => (acc[mem.id] = flag))
      }
      return acc
    }, {})
    const ids = []
    const flags = []
    for (const id in items) {
      ids.push(id)
      flags.push(items[id])
    }
    ids.length && broadcast(events.toggle_item_batch, ids, flags)
  } catch (e) {
    console.log('err', e)
    res.end('error')
    return
  }
  res.end('ok')
}

export default op
