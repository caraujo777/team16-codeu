package com.google.codeu.servlets;

import java.io.IOException;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

@WebServlet("/sf-locations")
public class SFServlet extends HttpServlet {

    JsonArray sfLocationsArray;

    @Override
    public void init() {
        sfLocationsArray = new JsonArray();
        Gson gson = new Gson();
        Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/sf-locations.csv"));
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] cells = line.split(",");
            String facilName = cells[0];
            String facilType = cells[1].replaceAll("\\s+","");
            String facilNickName = cells[2];
            double lat = Double.parseDouble(cells[3]);
            double lng = Double.parseDouble(cells[4]);

            sfLocationsArray.add(gson.toJsonTree(new sfLocations(facilType, facilName, facilNickName, lat, lng)));
        }
        scanner.close();
    }

    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
        response.setContentType("application/json");
        response.getOutputStream().println(sfLocationsArray.toString());
    }

    private static class sfLocations {
        String facilType;
        String facilName;
        String facilNickName;
        String websiteLink;
        double lat;
        double lng;
    

        private sfLocations(String facilType, String facilName, String facilNickName, double lat, double lng) {
        this.facilType = facilType;
        this.facilName = facilName;
        this.facilNickName = facilNickName;
        this.lat = lat;
        this.lng = lng;
        }
    }   
}

    