import React from 'react';

const Contact = () => (
  <div className="contact">
    <h1>Contact Us</h1>
    <div className="page-content">
      <div className="header">
        <h1 className="main-info-header">Sona Sarovar Trust</h1>
      </div>

      <div className="additional-info">
        <h2 className="add-info-header">Contact Person</h2>
        <div><span>Mrs. Sona Kumar: </span><span>+91-9820195874</span></div>
        <div><span>Ms. Laila Pannda: </span><span>+91-9821339900</span></div>
      </div>

      <div className="additional-info">
        <h2 className="add-info-header">Office Address</h2>
        <span>502 Raheja Crest 1, Oshiwara, Behind Infiniti Mall, Andheri West,</span>
        <span>Mumbai 400053</span>
      </div>

      <div className="additional-info">
        <h2 className="add-info-header">Office No.</h2>
        <span>+91-8655042119</span>
      </div>
      <div className="additional-info">
        <h2 className="add-info-header">E-mail</h2>
        <a href="mailto:contact@sonasarovartrust.org">contact@sonasarovartrust.org</a>
      </div>

      <div id="map">
        <iframe
          title="Sona Sarovar Trust Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.515544721893!2d72.81708101446887!3d19.1288974870576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b61d959b3d21%3A0x9526acafb4dbf6e8!2sRaheja+Complex+Ln%2C+Seven+Bunglow%2C+Andheri+West%2C+Mumbai%2C+Maharashtra+400047!5e0!3m2!1sen!2sin!4v1485939210544"
          width="1200"
          height="450"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);

export default Contact;
