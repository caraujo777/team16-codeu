/*
Description: UserMarker class represents the data 
stored with each user created marker. 
Author: Anna Kawakami
Created: 03/31/19
Last Updated: 03/31/19

Note to self - consider adding other functions 
as vision for map functionalities solidify. 
*/

package com.google.codeu.data;

public class UserMarker {
    private double lat;
    private double lng;
    private String content;

    public UserMarker(double lat, double lng, String content) {
        this.lat = lat;
        this.lng = lng;
        this.content = content;
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public String getContent() {
        return content; 
    }
}