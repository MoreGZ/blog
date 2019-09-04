/**
 * 组件名
 * @author: georgemo
*/
import * as React from 'react'
import { Button, Input, List, Icon, Card, Row, Col } from 'antd'
import { Utils } from '@common/index'
import * as _ from 'lodash'

const { useEffect, useState } = React

export default function Component (props) {
  const [ inputValue, setInputValue ] = useState('')
  const [ list, setList ] = useState([])

  function handleAddTodoItem() {
    let newList = list.concat([inputValue])

    if(_.isEmpty(inputValue)) {
      return 
    }

    setList(newList)
    setInputValue('')
  }

  function handleRemoveTodoItem(index) {
    console.log(index, index+1)
    let newList = Utils.deepClone(list)
    newList.shift(index, index + 1)
    console.log(newList)

    setList(newList)
  }

  function handleInputChange(e) {
    let currentValue = e.target.value

    setInputValue(currentValue)
  }

  return (
    <Card>
      <Card>
        <Row gutter={24}>
          <Col span={16}>
            <Input 
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e: any) => {
                console.log(e.charCode, 'charCode')
                console.log(e.keyCode, 'keyCode')
                console.log(e.key, 'key')
                if(e.key == 'Enter') { 
                  handleAddTodoItem()
                }
              }}
            />
          </Col>
          <Col span={8}>
            <Button onClick={handleAddTodoItem}>添加</Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <List 
          dataSource={list}
          bordered
          renderItem={ (item, index) => {
            return (
              <List.Item style={{ position: 'relative' }}>
                <span>{item}</span>
                <Icon type="close" onClick={() => { handleRemoveTodoItem(index) }}
                  style={{ position: 'absolute', right: 10, top: 16 }}
                />
              </List.Item>
            )
          } }
        />
      </Card>
    </Card>
  )
}
