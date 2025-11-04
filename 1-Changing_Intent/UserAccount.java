public class UserAccount {
    private String username;
    private String email;
    private boolean isActive;
    
    public UserAccount(String username, String email) {
        this.username = username;
        this.email = email;
        this.isActive = true;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void deactivate() {
        this.isActive = false;
    }
    
    public void activate() {
        this.isActive = true;
    }
    
    public void updateEmail(String newEmail) {
        this.email = newEmail;
    }
}
