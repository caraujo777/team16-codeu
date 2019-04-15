package com.google.codeu.data;

import java.util.ArrayList;
import java.util.List;

public class User {

  private String email, aboutMe;
  private List<String> mentionedMessageIds;

  public User(String email, String aboutMe) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.mentionedMessageIds = new ArrayList<String>();
  }

  public User(String email, String aboutMe, List mentionedMessageIds) {
    this.email = email;
    this.aboutMe = aboutMe;
    if (this.mentionedMessageIds != null) this.mentionedMessageIds.clear();
    else this.mentionedMessageIds = new ArrayList<String>();
    if (mentionedMessageIds != null) this.mentionedMessageIds.addAll(mentionedMessageIds);
  }

  public String getEmail() {
    return email;
  }

  public String getAboutMe() {
    return aboutMe;
  }

  public List getMentions() {
    return mentionedMessageIds;
  }

  public void addMention(String messageId) {
    if (mentionedMessageIds.contains(messageId) == false) mentionedMessageIds.add(messageId);
  }
}
