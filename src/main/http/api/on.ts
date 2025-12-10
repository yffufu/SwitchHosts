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
  }
  try {
    const { id, test } = body
    let list = await getList()
    const items = list
    .filter((item) => (id ? item.id === id : item.id.includes(test!)) && item.on !== flag);
    for(let item of items){
        await new Promise(resolve => setTimeout(resolve, 50));
        broadcast(events.toggle_item, item.id, flag)
    }
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
