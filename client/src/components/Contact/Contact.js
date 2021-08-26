import React, { Component  } from 'react';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state={
      isRedirect:false,
      userName:"",
      userEmail:"",
      userMsg:"",
    }
  }
  isChange=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
  
    this.setState({
      [name]:value
    });
  }
  submitForm=(event) =>{
     event.preventDefault();  
     this.setState({
       isRedirect:true
     });
  }  
  

  getGiaTri=()=>{
    var noiDung = "" ;
    noiDung +="Ten nhan duoc la :" + this.state.userName;
    noiDung +=" || Email nhan duoc la :" + this.state.userEmail;
    noiDung +=" || Message nhan duoc la :" + this.state.userMsg;
    return noiDung;
  }
 
  render(){
    if(this.state.isRedirect){
      console.log(this.getGiaTri());
     
    // return <Redirect to ="/"/>;

  }
  
    return(
        <div className="main">
        <div className="content">
          <div className="section group">
            <div className="col span_1_of_3">
            <div className="contact_info">
                <h3>Địa chỉ</h3>
                <div className="map">
                  <iframe width="100%" height={175} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.co.in/maps?f=q&source=s_q&hl=en&geocode=&q=Lighthouse+Point,+FL,+United+States&aq=4&oq=light&sll=26.275636,-80.087265&sspn=0.04941,0.104628&ie=UTF8&hq=&hnear=Lighthouse+Point,+Broward,+Florida,+United+States&t=m&z=14&ll=26.275636,-80.087265&output=embed" /><br /><small><a href="https://maps.google.co.in/maps?f=q&source=embed&hl=en&geocode=&q=Lighthouse+Point,+FL,+United+States&aq=4&oq=light&sll=26.275636,-80.087265&sspn=0.04941,0.104628&ie=UTF8&hq=&hnear=Lighthouse+Point,+Broward,+Florida,+United+States&t=m&z=14&ll=26.275636,-80.087265" style={{color: '#666', textAlign: 'left', fontSize: '12px'}}>View Larger Map</a></small>
                </div>
              </div>

              <div className="company_address">
                <h3>Địa chỉ liên hệ :</h3>
                <p>500 Lorem Ipsum Dolor Sit,</p>
                <p>22-56-2-9 Sit Amet, Lorem,</p>
                <p>USA</p>
                <p>Phone:(00) 222 666 444</p>
                <p>Fax: (000) 000 00 00 0</p>
                <p>Email: <span>info@mycompany.com</span></p>
                <p>Follow on: <span>Facebook</span>, <span>Twitter</span></p>
              </div>
             
            </div>
            <div className="col span_2_of_3">
            <div className="contact-form">
                <h2>Liên hệ với chúng tôi</h2>
                <form method="post" action="contact-post.html">
                  <div>
                    <span><label>Tên</label></span>
                    <span><input name="userName"  required type="text" onChange={(event)=> this.isChange(event)} className="textbox" data-validation-required-message="Please enter your name."/></span>
                  </div>
                  <div>
                    <span><label>E-mail</label></span>
                    <span><input  name="userEmail"  required type="text" onChange={(event)=> this.isChange(event)} className="textbox" data-validation-required-message="Please enter your name." /></span>
                  </div>
                 
                  <div>
                    <span><label>Nội dung</label></span>
                    <span><textarea name="userMsg"onChange={(event)=> this.isChange(event)} defaultValue={" "} /></span>
                  </div>
                  <div>
                    <span><input type="submit" defaultValue="Submit" className="myButton"onClick={(event)=>this.submitForm(event)} /></span>
                  </div>
                </form>
              </div>
            </div>
          </div>		
        </div> 
      </div>
      );
}
}

export default Contact