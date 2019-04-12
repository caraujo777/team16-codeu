package com.google.codeu.data;

import java.util.ArrayList;
import java.util.UUID;

public class User {

  private String email, aboutMe;
  private ArrayList<UUID> mentions;

  public User(String email, String aboutMe) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.mentions = new ArrayList<UUID>();
  }

  public User(String email, String aboutMe, ArrayList mentions) {
    this.email = email;
    this.aboutMe = aboutMe;
    if (this.mentions != null) 
      this.mentions.clear();
    else 
      this.mentions = new ArrayList<UUID>();
    this.mentions.addAll(mentions);
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

  public void addMention(UUID messageID) {
    mentions.add(messageID);
  }
}
