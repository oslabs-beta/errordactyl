// container to hold all endpoint components
// have to pass in array of endpoint objects
import { endpoint } from '../../types'

export default function Routes(endpoints : endpoint[]) {
  // render array of endpoint components
  return (
    <div>
      <h1>Routes</h1>
      {endpoints.map((endpoint) => ()}
    </div>
  )
}