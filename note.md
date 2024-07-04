# This child state update won't happen, initialize will only happen at initial mount
function Parent() {
  const [state] ...
  return (
    <Child prop={state}/>
  )
}
function Child(props){
  const [childState] = useState(props.prop)
}