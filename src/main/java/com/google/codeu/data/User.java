package com.google.codeu.data;

public class User {

  private String email, aboutMe, imageUrl;

  public User(String email, String aboutMe) {
    this.email = email;
    this.aboutMe = aboutMe;
  }

  public String getEmail() {
    return email;
  }

  public String getAboutMe() {
    return aboutMe;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getImageUrl() {
    return imageUrl;
  }
}
