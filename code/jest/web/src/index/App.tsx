import * as React from "react"
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect} from 'react-router-dom'
import TodoList from './components/TodoList'

@hot(module)
export default class extends React.Component<any, any> {
    render() {
        return <TodoList />
    }
}