import React, { useState } from 'react'
import AddPeople from './AddPeople'

export default function Members({channel, joined}) {

  const [addPeople, setAddPeople] = useState(false)

  return (
    <div>
      {joined && <button onClick={() => setAddPeople(true)}>Add people</button>}
      {channel && <ul>{channel.members.map((el,i) => <li key={i}>{el.slice(2)}</li>)}</ul>}

      {addPeople && <AddPeople channel={channel}/>}
    </div>
  )
}
