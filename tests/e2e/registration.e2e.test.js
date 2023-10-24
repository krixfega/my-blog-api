describe('User Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('/registration'); 
  
      // Enter valid registration details
      cy.get('input[name="username"]').type('newuser'); // Replace with a valid username
      cy.get('input[name="email"]').type('newuser@my-blog.com'); // Replace with a valid email
      cy.get('input[name="password"]').type('newpassword'); // Replace with a valid password
      cy.get('button[type="submit"]').click();
  
      // Assert that the user is registered and redirected to the expected page
      cy.url().should('include', '/dashboard'); 
    });
  
    it('should handle invalid registration data', () => {
      cy.visit('/registration'); 
  
      // Enter invalid registration details
      cy.get('input[name="username"]').type(''); // An invalid username
      cy.get('input[name="email"]').type('invalid-email'); // An invalid email
      cy.get('input[name="password"]').type('pass'); // An invalid password
      cy.get('button[type="submit"]').click();
  
      // Assert that the user sees an error message or stays on the registration page
      cy.url().should('include', '/registration'); 
      cy.get('.error-message').should('be.visible'); 
    });
  });
  