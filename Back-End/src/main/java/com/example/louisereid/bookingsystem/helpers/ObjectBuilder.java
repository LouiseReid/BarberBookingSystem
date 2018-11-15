package com.example.louisereid.bookingsystem.helpers;

import com.sun.jndi.toolkit.url.Uri;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.Optional;

@Service
public class ObjectBuilder {

    public static Long findId(String uriString) throws MalformedURLException {
        Uri objUri = new Uri(uriString);
        String objectPath = objUri.getPath();
        String objectStrId = objectPath.substring(objectPath.lastIndexOf('/') + 1);
        Long objectId = Long.parseLong(objectStrId);
        return objectId;
    }
    
}
