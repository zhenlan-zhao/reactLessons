/* eslint-disable no-useless-constructor */
import React, { useRef } from 'react'

//标记通常以下面两种方式中的一种来和表单控件相联系：将表单控件作为标记标签的内容，这样的就是隐式形式，或者为 <label> 标签下的 for 属性命名一个目标表单 id，这样就是显式形式。
//<input type="text">, <textarea> 和 <select> 之类的标签都非常相似—它们都接受一个 value 属性，你可以使用它来实现受控组件。
class NamedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit = (event) => {
    console.log('提交的名字', this.state.value);
    event.preventDefault();
  }
  render() {
    //由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。
    return (
      <form onSubmit={this.handleSubmit} className='new-component'>
        <label>
          名字：
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    }
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit = (event) => {
    console.log('this.state.value', this.state.value)
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          article:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
//你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'coconut'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='new-component'> 
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子coconut</option>
            <option value="mango">芒果mango</option>
          </select>
        </label>
        <div className='new-component'>
          <label htmlFor='multi'></label>
          <select multiple={true} defaultValue={['A', 'C']} id='multi'>
            <option value='A'>AAAAA</option>
            <option value='B'>BBBBB</option>
            <option value='C'>CCCCC</option>
          </select>
        </div>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
  }
  //当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <form>
        <label>
          参与：
          <input
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数：
          <input
            name='numberOfGuests'
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

//在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。
//要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 使用 ref 来从 DOM 节点中获取表单数据。
//因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时
class UCNamedForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log('this.input.current.value', this.input.current.value)
  }
  render() {
    //在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，
    // 在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是 value。
    //<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue。
    return (
      <form onSubmit={this.handleSubmit} className='new-component'>
        <label>
          Name:
          <input defaultValue="Bob" type="text" ref={this.input}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

//非受控组件
/* 
当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
你不能在函数组件上使用 ref 属性，因为他们没有实例。
*/
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
  }
  focusTextInput = () => {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    //React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。
    //ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。
    this.textInput.current.focus();
  }
  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div className='new-component'>
        <input type='text' ref={this.textInput}/>
        <input type='button' value='Focus on the text input' onClick={this.focusTextInput}/>
      </div>
    )
  }
}

//模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 focusTextInput 方法：
class AutoFoucsTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.textInput.current.focusTextInput();
  }
  render() {
    return (
      <div className='new-component'>
        <CustomTextInput ref={this.textInput}/>
      </div>
    )
  }
} 

//默认情况,你不能在函数组件上使用 ref 属性，因为它们没有实例：
//可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件：
function MyFunctionComponent() {
  const textInput = useRef(null);
  function handleClick() {
    textInput.current.focus();
  }
  return (
    <div className='new-component'>
      <input type='text' ref={textInput}/>
      <input type='button' value='Fucous the text input' onClick={handleClick}/>
    </div>
  )
}

//回调refs
class CallBackCustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    //使用 ref 回调函数，在实例的属性中存储对 DOM 节点的引用。
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      if (this.textInput) {
        this.textInput.focus();
      }
    }
  }
  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }
  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React实例上（比如 this.textInput）
    //不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。
    return (
      <div className='new-component'>
        <input type="text" ref={this.setTextInputRef}/>
        <input type="button" value="Focus the text input" onClick={this.focusTextInput}/>
      </div>
    )
  }
}

// React 中，<input type="file" /> 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。
// 您应该使用 File API 与文件进行交互。
class UCFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.fileInput.current.files.length) {
      console.log('this.fileInput.current.files[0].name', this.fileInput.current.files[0].name)
    } else {
      alert('please choose a file first then submit ')
    }
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='new-component'>
        <label>
          Uplpad File:
          <input type="file" ref={this.fileInput}/>
        </label>
        <br/>
        <button type="submit" className='form-submit-button'>Submit</button>
      </form>
    )
  }
}

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='new-component'>
        <div className='controlled'>
          <NamedForm/>
          <EssayForm/>
          <FlavorForm/>
          <Reservation/>
        </div>
        <div className="uncontrolled">
          <UCFileInput/>
          <AutoFoucsTextInput/>
          <UCNamedForm/>
          <MyFunctionComponent/>
          <CallBackCustomTextInput/>
        </div>
      </div>
      
    )
  }
}
export default FormComponent;