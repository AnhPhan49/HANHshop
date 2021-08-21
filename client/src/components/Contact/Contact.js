import React, {useState} from 'react'


const Contact = (props) => {
    
    return(
        <div className="main">
        <div className="content">
          <div className="section group">
            <div className="col span_2_of_3">
              <div className="contact-form">
                <h2>Contact Us</h2>
                <form method="post" action="contact-post.html">
                  <div>
                    <span><label>Name</label></span>
                    <span><input name="userName" type="text" className="textbox" /></span>
                  </div>
                  <div>
                    <span><label>E-mail</label></span>
                    <span><input name="userEmail" type="text" className="textbox" /></span>
                  </div>
                  <div>
                    <span><label>Company Name</label></span>
                    <span><input name="userPhone" type="text" className="textbox" /></span>
                  </div>
                  <div>
                    <span><label>Subject</label></span>
                    <span><textarea name="userMsg" defaultValue={" "} /></span>
                  </div>
                  <div>
                    <span><input type="submit" defaultValue="Submit" className="myButton" /></span>
                  </div>
                </form>
              </div>
            </div>
            <div className="col span_1_of_3">
              <div className="contact_info">
                <h3>Find Us Here</h3>
                <div className="map">
                  <iframe width="100%" height={175} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.co.in/maps?f=q&source=s_q&hl=en&geocode=&q=Lighthouse+Point,+FL,+United+States&aq=4&oq=light&sll=26.275636,-80.087265&sspn=0.04941,0.104628&ie=UTF8&hq=&hnear=Lighthouse+Point,+Broward,+Florida,+United+States&t=m&z=14&ll=26.275636,-80.087265&output=embed" /><br /><small><a href="https://maps.google.co.in/maps?f=q&source=embed&hl=en&geocode=&q=Lighthouse+Point,+FL,+United+States&aq=4&oq=light&sll=26.275636,-80.087265&sspn=0.04941,0.104628&ie=UTF8&hq=&hnear=Lighthouse+Point,+Broward,+Florida,+United+States&t=m&z=14&ll=26.275636,-80.087265" style={{color: '#666', textAlign: 'left', fontSize: '12px'}}>View Larger Map</a></small>
                </div>
              </div>
              <div className="company_address">
                <h3>Company Information :</h3>
                <p>500 Lorem Ipsum Dolor Sit,</p>
                <p>22-56-2-9 Sit Amet, Lorem,</p>
                <p>USA</p>
                <p>Phone:(00) 222 666 444</p>
                <p>Fax: (000) 000 00 00 0</p>
                <p>Email: <span>info@mycompany.com</span></p>
                <p>Follow on: <span>Facebook</span>, <span>Twitter</span></p>
              </div>
            </div>
          </div>		
        </div> 
      </div>
      )
}

export default Contact