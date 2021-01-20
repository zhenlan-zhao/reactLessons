import React from 'react';

function FormateedDate(props) {
  return (
    <div>
      <h2>It is <div className='TimeStamp'>{props.date.toLocaleTimeString()}.</div></h2>
      <h2>And I'm a independent Functional Component :)</h2>
    </div>
  )
}

class MiniClock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      interval: props.interval
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.state.interval
    )
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div className='singleColom'>
        <h1>Hello World</h1>
        <FormateedDate date={this.state.date}/>
        <h3>And now, I'm learning React. Interval is {this.state.interval} ms</h3>
      </div>
    )
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class Clock extends React.Component{
  render() {
    return(
      <div>
        <div className='twoColums BFC'>
          <MiniClock interval='1000'/>
          <MiniClock interval='2000'/>
        </div>
        
        {/*垂直居中布局，左右10px，高度：宽度 = 1 ： 5 */}
        <div className='outerWrapper BFC'>
          <div className='innerWrapper'>
            <div className='box'>A</div>
          </div>
        </div>
        {/* 圣杯布局 */}
        <div className="shengbei BFC">
          <div id='sbheader'></div>
          <Toggle />
          <div id='sbcontainer'>
            <div id='sbcenter' className='sbcolumn'></div>
            <div id='sbleft' className='sbcolumn'></div>
            <div id='sbright' className='sbcolumn'></div>
          </div>
          <div id='sbfooter'></div>
        </div>
        {/* 简易版圣杯布局 */}
        <div className="easyshengbei BFC">
          <div id='esbheader'></div>
          <div id='esbcontainer'>
            <div id='esbleft' ></div>
            <div id='esbcenter'></div>
            <div id='esbright'></div>
          </div>
          <div id='esbfooter'></div>
        </div>
        {/* 双飞翼布局 */}
        <div className='shuangfeiyi BFC'>
          <div id='sfcontainer'>
            <div id='sfcenter' >
              <div id='sfinner'>双飞翼布局</div>
            </div>
            <div id='sfleft'></div>
            <div id='sfright'></div>
          </div>
        </div>
      </div>
      
    )
  }
}
export default Clock;