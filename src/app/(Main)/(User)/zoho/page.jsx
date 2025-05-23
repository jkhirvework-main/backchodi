import Salesiq from '@/app/(Utils)/(widgets)/SalesIq'
import React from 'react'

export default function page() {
  return (
    <div>
        <Salesiq widgetCode={"siq007cda334bfccf8ff689f91b2ca5d9db76ed960fef84b05f6aa7fb4811262e36"} domain={'https://salesiq.zohopublic.in/widget'} />
    </div>
  )
}
