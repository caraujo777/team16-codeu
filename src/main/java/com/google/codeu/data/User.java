package com.google.codeu.data;

import java.util.ArrayList;

public class User {

  private String email, aboutMe;
  private ArrayList<String> mentions;

  public User(String email, String aboutMe) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.mentions = new ArrayList<String>();
  }

  public User(String email, String aboutMe, ArrayList mentions) {
    this.email = email;
    this.aboutMe = aboutMe;
    if (this.mentions != null) this.mentions.clear();
    else this.mentions = new ArrayList<String>();
    if (mentions != null) this.mentions.addAll(mentions);
  }

  public String getEmail() {
    return email;
  }

  public String getAboutMe() {
    return aboutMe;
  }

  public ArrayList getMentions() {
    return mentions;
  }

  public void addMention(String messageId) {
    if (mentions.contains(messageId) == false) mentions.add(messageId);
  }
}
