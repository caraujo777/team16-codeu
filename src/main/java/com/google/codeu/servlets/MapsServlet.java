package com.google.codeu.servlets;

import java.io.IOException;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;


/**
     * Returns boba locations data as a JSON array, e.g. 
     * [{"lat": 38.4404675, "lng": -122.7144313}]
     */

@WebServlet("/boba-locations")
public class MapsServlet extends HttpServlet {

    JsonArray bobaLocationsArray;
    @Override
    public void init() {
        bobaLocationsArray = new JsonArray();
        Gson gson = new Gson();
        Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
            "/WEB-INF/boba-locations.csv"));
        while(scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] cells = line.split(",");
            double lat = Double.parseDouble(cells[0]);
            double lng = Double.parseDouble(cells[1]);

            bobaLocationsArray.add(gson.toJsonTree(new bobaLocations(lat, lng)));
        }
        scanner.close();
    }

    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
        response.setContentType("application/json");
        response.getOutputStream().println(bobaLocationsArray.toString());
    }

    private static class bobaLocations {
        double lat;
        double lng;
    

        private bobaLocations(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
        }
    }   
}
// test above code by runnning on development server 
    // navigate to http://localhost:8080/boba-locations

    







    // need to check from here 
   /**
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/ufo-data.csv"));
     while(scanner.hasNextLine()) {
     String line = scanner.nextLine();
     String[] cells = line.split(",");
    
     String state = cells[0];
     double lat = Double.parseDouble(cells[1]);
     double lng = Double.parseDouble(cells[2]);
     
     System.out.println("state: " + state);
     System.out.println("lat: " + lat);
     System.out.println("lng: " + lng);
     System.out.println();
    }
scanner.close();
}
// to here to check the data prints correctly and delete this clump after checked
}
*/