import React from 'react'

function ListItem(props) {
  //元素的 key 只有放在就近的数组上下文中才有意义。
  //这里不需要key
  return <li>Number:{props.value} && Index:{props.index}</li>;
}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((num,index) => {
    return <ListItem key={num.toString()} value={num} index={index}/>
  });
  return (
    <ul className='new-component'>{listItems}</ul>
  );
}

export default NumberList;
