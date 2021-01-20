function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <div className="UserInfo">
      <img 
      className='Avatar'
      src={props.user.avatarUrl}
      alt={props.user.name}
      />
      <div className='description'>This is description</div>
    </div>
    
  );
}
function UserInfo(props) {
  return (
    <div>
      <Avatar user={props.user}/>
    </div>
  );
}

function Comment(props) {
  return (
    <div className='Comment'>
      <UserInfo user={props.author}/>
      <div className="mainContent">
        <div className='mainContent-left'>
          <div className='vertivalMiddle'>{props.author.name}</div>
        </div> 
        <div className="mainContent-right"> 
          <div className='Comment-text'>
            <div className='vertivalMiddleHalf'>
              {props.text}
            </div>
          </div>
          <div className='Comment-date'>
            <div className='vertivalMiddleHalf'>
              {formatDate(props.date)}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
export default Comment;