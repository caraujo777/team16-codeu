/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Provides access to the data stored in Datastore. */
public class Datastore {

  private DatastoreService datastore;

  public Datastore() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  /** Stores the Message in Datastore. */
  public void storeMessage(Message message) {
    Entity messageEntity = new Entity("Message", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());
    messageEntity.setProperty("recipient", message.getRecipient());
    messageEntity.setProperty("sentimentScore", message.getSentimentScore());
    if(message.getImageUrl() != null) {
      messageEntity.setProperty("imageUrl", message.getImageUrl());
    }
    if(!message.getTags().isEmpty()) {
      messageEntity.setProperty("tags", message.getTags());
    }
    datastore.put(messageEntity);
  }

  /**
   * Iterates through a result and return a list of messages
   *
   * @return list of messages
   */
  public List<Message> getMessagesFromResults(PreparedQuery results) {
    List<Message> messages = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      try {
       String idString = entity.getKey().getName();
       UUID id = UUID.fromString(idString);
       String user = (String) entity.getProperty("user");
       String text = (String) entity.getProperty("text");
       long timestamp = (long) entity.getProperty("timestamp");
       String recipient = (String) entity.getProperty("recipient");
       float sentimentScore = entity.getProperty("sentimentScore") == null? (float) 0.0 : ((Double) entity.getProperty("sentimentScore")).floatValue();
       String imageUrl = (String) entity.getProperty("imageUrl");
       ArrayList tags = (ArrayList) entity.getProperty("tags");
 	    Message message = new Message(id, user, text, timestamp, recipient, sentimentScore, tags);
 	    message.setImageUrl(imageUrl);
       messages.add(message);
      } catch (Exception e) {
       System.err.println("Error reading message.");
       System.err.println(entity.toString());
       e.printStackTrace();
      }
    }
    return messages;
  }

  /**
   * Gets messages posted by a specific user.
   *
   * @return a list of messages posted by the user, or empty list if user has never posted a
   *     message. List is sorted by time descending.
   */
  public List<Message> getMessages(String recipient) {
    List<Message> messages = new ArrayList<>();

    Query query =
        new Query("Message")
            .setFilter(new Query.FilterPredicate("recipient", FilterOperator.EQUAL, recipient))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return getMessagesFromResults(results);
  }

  public List<Message> getTaggedMessages(String tag) {
    List<Message> messages = new ArrayList<>();

    Query query = 
        new Query("Message")
          .setFilter(new Query.FilterPredicate("tags", FilterOperator.EQUAL, tag))
          .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return getMessagesFromResults(results);
  }

  /**
   * Gets messages posted by a all users.
   *
   * @return a list of messages posted by all users, or empty list if no one has posted a message.
   *     List is sorted by time descending.
   */
  public List<Message> getAllMessages() {
    Query query = new Query("Message").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return getMessagesFromResults(results);
  }

  /** Stores User in Datastore. */
  public void storeUser(User user) {
    Entity userEntity = new Entity("User", user.getEmail());
    userEntity.setProperty("email", user.getEmail());
    userEntity.setProperty("aboutMe", user.getAboutMe());
    userEntity.setProperty("mentions", user.getMentions());
    userEntity.setProperty("imageUrl", user.getImageUrl());
    datastore.put(userEntity);
  }

  /** Returns User owned by email addres or null if no matching User found */
  public User getUser(String email) {
    Query query =
        new Query("User")
            .setFilter(new Query.FilterPredicate("email", FilterOperator.EQUAL, email));
    PreparedQuery results = datastore.prepare(query);
    Entity userEntity = results.asSingleEntity();
    if (userEntity == null) {
      return null;
    }

    String aboutMe = (String) userEntity.getProperty("aboutMe");
    List mentions = (List) userEntity.getProperty("mentions");
    User user = new User(email, aboutMe, mentions);
    String imageUrl = (String) userEntity.getProperty("imageUrl");
    user.setImageUrl(imageUrl);

    return user;
  }

  /**
   * Gets the total number of messages for all users.
   *
   * @return an integer representing the total number of messages posted by all users.
   */
  public int getTotalMessageCount() {
    Query query = new Query("Message");
    PreparedQuery results = datastore.prepare(query);
    return results.countEntities(FetchOptions.Builder.withLimit(1000));
  }

  /**
   * Retrieves instances of the UserMarker class.
   *
   * @return a list of the UserMarker instances
   */
  public List<UserMarker> getMarkers() {
    List<UserMarker> markers = new ArrayList<>();

    Query query = new Query("UserMarker");
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      try {
        double lat = (double) entity.getProperty("lat");
        double lng = (double) entity.getProperty("lng");
        String content = (String) entity.getProperty("content");

        UserMarker marker = new UserMarker(lat, lng, content);
        markers.add(marker);
      } catch (Exception e) {
        System.err.println("Error reading marker.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }
    return markers;
  }

  /**
   * Stores instances of the UserMarker class.
   *
   * @return N/A
   */
  public void storeMarker(UserMarker marker) {
    Entity markerEntity = new Entity("UserMarker");
    markerEntity.setProperty("lat", marker.getLat());
    markerEntity.setProperty("lng", marker.getLng());
    markerEntity.setProperty("content", marker.getContent());
    datastore.put(markerEntity);
  }
}
