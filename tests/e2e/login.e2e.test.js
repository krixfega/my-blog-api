describe('Login', () => {
    it('should log in a user successfully', () => {
      cy.visit('/login'); 
  
      // Enter valid login credentials
      cy.get('input[name="email"]').type('test@my-blog.com'); // Replace with a valid email
      cy.get('input[name="password"]').type('testpassword'); // Replace with a valid password
      cy.get('button[type="submit"]').click();
  
      // Assert that the user is logged in and redirected to the expected page
      cy.url().should('include', '/dashboard'); 
    });
  
    it('should handle invalid login credentials', () => {
      cy.visit('/login'); 
  
      // Enter invalid login credentials
      cy.get('input[name="email"]').type('invalid@my-blog.com'); // Replace with an invalid email
      cy.get('input[name="password"]').type('invalidpassword'); // Replace with an invalid password
      cy.get('button[type="submit"]').click();
  
      // Assert that the user sees an error message or stays on the login page
      cy.url().should('include', '/login'); 
      cy.get('.error-message').should('be.visible'); 
    });
  });
  