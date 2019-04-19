package com.google.codeu.servlets;

import java.io.IOException;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;


@WebServlet("/sfdata")
public class SfMapsServlet extends HttpServlet {

JsonArray sfArray;

 @Override
 public void init() {
  sfArray = new JsonArray();
  Gson gson = new Gson();
  Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/sfdata.csv"));
  while(scanner.hasNextLine()) {
   String line = scanner.nextLine();
   String[] cells = line.split(",");

   double lat = Double.parseDouble(cells[0]);
   double lng = Double.parseDouble(cells[1]);
   String type = cells[2];
   String name = cells[3];


   sfArray.add(gson.toJsonTree(new SFLocation(lat, lng, type, name)));
  }
  scanner.close(); 
 }

 @Override
 public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
  response.setContentType("application/json");
  response.getOutputStream().println(sfArray.toString());
 }

 private static class SFLocation{
  double lat;
  double lng;
  String type;
  String name;

  private SFLocation(double lat, double lng, String type, String name) {
   this.lat = lat;
   this.lng = lng;
   this.type = type;
   this.name = name;
  }
 }
}