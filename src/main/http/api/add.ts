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

const add = async (req: Request, res: Response) => {
  const body = req.body as {
    id: string
    title: string
    meta: object
    content: string
  }
  try {
    let list = await getList()
    let { title, content, id, meta } = body
    let item = findItemById(list, id)
    let activeid
    if (item) {
      await setHostsContent(item.id, content)
      activeid = item.id
      broadcast(events.hosts_refreshed_by_id, activeid)
      if(item.on){
        broadcast(events.toggle_item, item.id, true)
      }
    } else {
      await setHostsContent(id, content)
      list.push({id, title, type: 'local', on: false, meta})
      await setList(list)
      activeid = id
      broadcast(events.hosts_refreshed_by_id, activeid)
      broadcast(events.reload_list)
    }
  } catch (e) {
    console.log('err', e)
    res.end('error')
    return
  }

  res.end('ok')
}

export default add
