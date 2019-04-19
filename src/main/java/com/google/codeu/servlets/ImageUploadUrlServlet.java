package com.google.codeu.servlets;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Provides access to a URL that allows a user to upload an image to Blobstore.
 */
@WebServlet("/image-upload-url")
public class ImageUploadUrlServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    String callParam = request.getParameter("call");
    String uploadUrl = "";
    if(callParam.contains("feed")) {
    	uploadUrl = blobstoreService.createUploadUrl("/feed");
    }
    else {
    	uploadUrl = blobstoreService.createUploadUrl("/messages");
    }

    response.setContentType("text/html");
    response.getOutputStream().println(uploadUrl);
  }
}
