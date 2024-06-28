import React from 'react';

const ContactUs = () => {
  return (
    <div>
      <h2 style={{ color: 'white' }}>Contact Us</h2>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Simsbury Board of Education Main Number:</strong> (860) 651-3361</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Central Office Fax #:</strong> 860-651-4343</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>SHS:</strong> (860) 658-0451</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>HJMS:</strong> (860) 651-3341</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Central:</strong> (860) 658-4732</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Latimer Lane:</strong> (860) 658-4774</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Squadron Line:</strong> (860) 658-2251</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Tariffville:</strong> (860) 658-5825</p>
      <p style={{ color: 'white' }}><strong style={{ color: 'white' }}>Tootin' Hills:</strong> (860) 658-7629</p>
      <form>
        <div>
          <label htmlFor="search" style={{ color: 'white' }}>Didn't find what you were looking for on our website?</label><br/>
          <textarea id="search" name="search" rows="4" cols="50"></textarea>
        </div>
        <div>
          <label htmlFor="searchLocation" style={{ color: 'white' }}>Where did you search?</label><br/>
          <select id="searchLocation" name="searchLocation">
            <option value="DistrictHomePage">District home page</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <div>
          <label htmlFor="email" style={{ color: 'white' }}>Please provide an email address so we can follow up with your issue.</label><br/>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
