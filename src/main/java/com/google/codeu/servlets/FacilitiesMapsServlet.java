package com.google.codeu.servlets;

import java.io.IOException;
//import java.net.MalformedURLException;
//import java.net.URL;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

/**
 * Returns facilities locations data as a JSON array, e.g. [{"lat": 38.4404675,
 * "lng": -122.7144313}]
 */

@WebServlet("/dogFacilities-locations")
public class FacilitiesMapsServlet extends HttpServlet {

    JsonArray facilitiesLocationsArray;

    @Override
    public void init() {
        facilitiesLocationsArray = new JsonArray();
        Gson gson = new Gson();
        Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/dogFacilities-locations.csv"));
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] cells = line.split(",");
            String facilType = cells[0];
            String facilName = cells[1];
            /*
            URL facilURL;
            try {
                facilURL = new URL(cells[2]);
            } catch (MalformedURLException e) {
                facilURL = new URL("N/A");
                System.out.println(e);
            }
            */
            double lat = Double.parseDouble(cells[3]);
            double lng = Double.parseDouble(cells[4]);

            facilitiesLocationsArray.add(gson.toJsonTree(new facilitiesLocations(facilType, facilName, lat, lng)));
        }
        scanner.close();
    }

    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
        response.setContentType("application/json");
        response.getOutputStream().println(facilitiesLocationsArray.toString());
    }

    private static class facilitiesLocations {
        String facilType;
        String facilName;
       // URL facilURL;
        String websiteLink;
        double lat;
        double lng;
    

        private facilitiesLocations(String facilType, String facilName, double lat, double lng) {
        this.facilType = facilType;
        this.facilName = facilName;
       // this.facilURL = facilURL; temporarily don't use
        this.lat = lat;
        this.lng = lng;
        }
    }   
}

    