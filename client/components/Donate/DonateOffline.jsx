import React from 'react';

const DonateOffline = () => (
  <div className="donate-offline">
    <h1>Donate Offline</h1>
    <div className="page-content">
      <div className="donation-method">
        <h2>You can donate to us via check</h2>
        <h3>The cheque should be drawn in favour of</h3>
        <h2 className="trust-name">Sona Sarovar Trust</h2>
        <h3>and sent to:-</h3>
        <span>
          <p>502, Raheja Crest-1</p>
          <p>Oshiwara, Behind Infiniti Mall</p>
          <p>Andheri West</p>
          <p>Mumbai 400053</p>
          <p>India</p>
        </span>
      </div>

      <div className="donation-method">
        <h2>You can donate to us via NEFT</h2>
        <h3>Bank details</h3>
        <h2 className="bank-name">Oriental Bank of Commerce</h2>
        <p className="bank-address">
          Kamal Apartment, Plot No 68, Lokhandwala Complex,
          Versova, Off J P Road, Andheri West, Mumbai 400053,
          India
        </p>
        <div className="info">
          <span className="bold">Name:</span>
          <span>Sona Sarover Trust</span>
        </div>

        <div className="info">
          <span className="bold">Savings Bank Account No</span>
          <span>- 04552011002932</span>
        </div>

        <div className="info">
          <span className="bold">MICR No (9 digit)</span>
          <span>- 400022013</span>
        </div>

        <div className="info">
          <span className="bold">IFSC Code</span>
          <span>- ORBC 0100455</span>
        </div>
      </div>
    </div>
  </div>
);

export default DonateOffline;
