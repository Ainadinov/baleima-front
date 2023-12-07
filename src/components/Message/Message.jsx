import styleMessage from "./message.module.scss"


function Message ({setIsMessageOpen}) {
    return (
      <div className={styleMessage.container}>
        <div className={styleMessage.message}>
          <div className={styleMessage.header}>
              <h2>Сообщение</h2>
              <img className={styleMessage.remove} onClick={()=> setIsMessageOpen(false)} src='/img/btn-rem-active.svg' alt='remove'/>
          </div>
            
        </div>              
      </div>
    );
  }
  
  export default Message;